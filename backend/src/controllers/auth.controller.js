const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateOtp = require("../utils/generateOtp");
const {
sendOtpEmail
}
=
require(
"../services/mail.service"
);


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
            role: user.role,
            version: user.tokenVersion

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
                isVerified: user.isVerified,
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

    // blocked login

    if (user.isBlocked) {

        return res.status(403).json({

            type: "blocked",

            reason:
                user.blockReason,

            userId:
                user.id,

            appealStatus:
                user.deactivationAppealStatus,

            appealRejectCount:
                user.appealRejectCount || 0,

            rejectedAt:

                user.appealHistory?.length

                    ?

                    user.appealHistory[
                        user.appealHistory.length - 1
                    ]?.date

                    :

                    null,

            message:
                "Account blocked"

        });

    }


    // suspended login

    if (

        user.isSuspended &&

        user.suspensionEndsAt &&

        user.suspensionEndsAt >

        new Date()

    ) {

        return res.status(403).json({

            type: "suspended",

            reason:
                user.suspensionReason,

            until:
                user.suspensionEndsAt,

            userId:
                user.id,

            appealStatus:
                user.deactivationAppealStatus,

            appealRejectCount:
                user.appealRejectCount || 0,

            rejectedAt:

                user.appealHistory?.length

                    ?

                    user.appealHistory[
                        user.appealHistory.length - 1
                    ]?.date

                    :

                    null,

            message:
                "Account suspended"

        });

    }

    const token = jwt.sign({

        id: user._id,

        role: user.role,

        version: user.tokenVersion

    },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            isVerified: user.isVerified,
            verificationStatus: user.verificationStatus,
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
            .select("name email role profileImage isVerified verificationStatus");

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

async function requestEmailChange(req, res) {

    try {

        const { currentPassword, newEmail } = req.body;

        const user = await userModel.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // password check
        const isPasswordValid =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isPasswordValid) {

            return res.status(401).json({
                message: "Incorrect password"
            });

        }

        // email already exists
        const existingUser =
            await userModel.findOne({
                email: newEmail
            });

        if (existingUser) {

            return res.status(409).json({
                message: "Email already in use"
            });

        }

        // generate otp
        const otp = generateOtp();

        const otpExpires =
            new Date(Date.now() + 10 * 60 * 1000);

        user.pendingEmail = newEmail;

        user.emailChangeOtp = otp;

        user.emailChangeOtpExpires =
            otpExpires;

        await user.save();

        await sendOtpEmail(newEmail, otp);

        res.status(200).json({

            message:
                "OTP sent to new email"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

async function verifyEmailChangeOtp(req, res) {

    try {

        const { otp } = req.body;

        const user =
            await userModel.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.emailChangeOtp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (
            user.emailChangeOtpExpires
            < new Date()
        ) {

            return res.status(400).json({
                message: "OTP expired"
            });

        }

        // update email
        user.email = user.pendingEmail;

        // clear temp fields
        user.pendingEmail = undefined;

        user.emailChangeOtp = undefined;

        user.emailChangeOtpExpires =
            undefined;

        await user.save();

        res.status(200).json({

            message:
                "Email updated successfully",

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


async function getAllAdmins(req, res) {

    try {

        const admins =
            await userModel.find({

                role: "admin"

            })
                .select(
                    "_id name profileImage role"
                );

        res.status(200).json(
            admins
        );

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message:
                "Server error"
        });

    }

}

module.exports = {
    registerUser,
    verifyOtp,
    resendOtp,
    loginUser,
    logoutUser,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    changePassword,
    requestEmailChange,
    verifyEmailChangeOtp,
    getAllAdmins
}