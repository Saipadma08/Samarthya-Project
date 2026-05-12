const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../services/mail.service");

async function addAdmin(req, res) {

    try {

        const { name, email, password } = req.body;

        const userAlreadyExist =
            await userModel.findOne({ email });

        if (userAlreadyExist) {

            return res.status(409).json({
                message: "User already exist"
            });

        }

        const hash =
            await bcrypt.hash(password, 10);

        // generate otp
        const otp = generateOtp();

        // otp expiry (10 mins)
        const otpExpires =
            new Date(Date.now() + 10 * 60 * 1000);

        const newAdmin = await userModel.create({

            name,
            email,

            password: hash,

            role: "admin",

            otp,
            otpExpires,

            isVerified: false,

            emailVerified: false

        });

        // send otp email
        await sendOtpEmail(email, otp);

        res.status(201).json({

            message:
                "Admin added successfully. OTP sent to email.",

            user: {

                id: newAdmin._id,

                name: newAdmin.name,

                email: newAdmin.email,

                role: newAdmin.role

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

module.exports = { addAdmin };