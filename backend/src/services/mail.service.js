const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});


// OTP mail (keep existing behavior)

async function sendOtpEmail(
    email,
    otp
) {

    await transporter.sendMail({

        from:
            process.env.EMAIL_USER,

        to: email,

        subject:
            "Samarthya Email Verification OTP",

        html: `
            <h2>Email Verification</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>
            This OTP expires in 10 minutes
            </p>
        `
    });

}


// Generic mail (new)

async function sendMail(

    email,
    subject,
    message

) {

    await transporter.sendMail({

        from:
            process.env.EMAIL_USER,

        to: email,

        subject,

        html: `
        <div style="
        font-family:Arial;
        padding:20px;
        ">

        ${message.replace(
            /\n/g,
            "<br>"
        )}

        </div>
        `
    });

}


module.exports = {

    sendOtpEmail,

    sendMail

};