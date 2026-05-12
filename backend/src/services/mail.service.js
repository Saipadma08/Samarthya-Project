const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

async function sendOtpEmail(email, otp) {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Samarthya Email Verification OTP",

        html: `
            <h2>Email Verification</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>
                This OTP will expire in 10 minutes.
            </p>
        `
    });

}

module.exports = sendOtpEmail;