const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employee', 'employer', 'admin'],
        required: true,
    },
    profileImage: String,

    // trust badge system
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ["none", "pending", "approved", "rejected"],
        default: "none"
    },

    // email verification system
    emailVerified: {
        type: Boolean,
        default: false
    },

    otp: String,

    otpExpires: Date,

    verificationCreatedAt: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
)

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;