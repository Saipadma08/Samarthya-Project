const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../services/mail.service");


async function registerUser(req, res) {

    try {

        const { name, email, password, role } = req.body;

        const isUserAlreadyExists =
            await userModel.findOne({ email });

        if (isUserAlreadyExists) {

            // allow retry if not verified
            if (!isUserAlreadyExists.emailVerified) {

                await userModel.deleteOne({
                    _id: isUserAlreadyExists._id
                });

            }

            else {

                return res.status(409).json({
                    message: "User already exists"
                });

            }

        }

        if (role === "admin") {

            return res.status(403).json({
                message: "Admin cannot register"
            });

        }

        const hash = await bcrypt.hash(password, 10);

        // generate OTP
        const otp = generateOtp();

        // expiry = 10 minutes
        const otpExpires =
            new Date(Date.now() + 10 * 60 * 1000);

        // create user
        const user = await userModel.create({

            name,
            email,
            password: hash,
            role,

            emailVerified: false,

            otp,
            otpExpires,

            isVerified: false
        });

        // send email
        await sendOtpEmail(email, otp);

        res.status(201).json({

            message:
                "OTP sent to your email",

            email: user.email
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function verifyOtp(req, res) {

    try {

        const { email, otp, fromAddAdmin, fromForgotPassword } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // already verified
        if (user.emailVerified && !fromForgotPassword) {

            return res.status(400).json({
                message: "Email already verified"
            });

        }

        // invalid OTP
        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        // expired OTP
        if (user.otpExpires < new Date()) {

            return res.status(400).json({
                message: "OTP expired"
            });

        }

        // verify email
        if (!fromForgotPassword) {

            user.emailVerified = true;


        }

        // remove OTP
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        // login after verification
        const token = jwt.sign({

            id: user._id,
            role: user.role

        },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        if (!fromAddAdmin) {

            res.cookie("token", token);

        }

        res.status(200).json({

            message: "Email verified successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                isVerified: user.isVerified
            }

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function resendOtp(req, res) {

    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.emailVerified) {

            return res.status(400).json({
                message: "Email already verified"
            });

        }

        // generate new OTP
        const otp = generateOtp();

        // new expiry
        const otpExpires =
            new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;

        await user.save();

        // send mail
        await sendOtpEmail(email, otp);

        res.status(200).json({
            message: "OTP resent successfully"
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    if (!user.emailVerified) {

        return res.status(403).json({
            message: "Please verify your email before logging in"
        });

    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            isVerified: user.isVerified
        }
    })
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logged out successfully"
        })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}


//to get current logged in user data
async function getCurrentUser(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
            .select("name email role profileImage");

        res.json({ user });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function forgotPassword(req, res) {

    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // generate otp
        const otp = generateOtp();

        // otp expiry (10 mins)
        const otpExpires =
            new Date(Date.now() + 10 * 60 * 1000);

        // save otp
        user.otp = otp;
        user.otpExpires = otpExpires;

        await user.save();

        // send email
        await sendOtpEmail(email, otp);

        res.status(200).json({
            message: "OTP sent successfully"
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function resetPassword(req, res) {

    try {

        const {
            email,
            newPassword
        } = req.body;

        const user =
            await userModel.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // hash new password
        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        // update password
        user.password = hashedPassword;

        // clear otp
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({
            message:
                "Password reset successfully"
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function changePassword(req, res) {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        const user =
            await userModel.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // check current password
        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message: "Current password is incorrect"
            });

        }

        // hash new password
        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        // update password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message:
                "Password changed successfully"
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

module.exports = { registerUser, verifyOtp, resendOtp, loginUser, logoutUser, getCurrentUser, forgotPassword, resetPassword, changePassword }