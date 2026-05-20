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

    trustScore: {
    type: Number,
    default: 0,
    },

    totalReviews: {
        type: Number,
        default: 0,
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

    pendingEmail: {
        type: String
    },

    emailChangeOtp: {
        type: String
    },

    emailChangeOtpExpires: {
        type: Date
    },

    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],

    isBlocked: {
        type: Boolean,
        default: false
    },

    blockReason: {
        type: String
    },

    blockedAt: {
        type: Date
    },

    blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    isSuspended: {
        type: Boolean,
        default: false
    },

    suspensionEndsAt: {
        type: Date
    },

    suspensionReason: {
        type: String
    },

    deactivationAppealStatus: {
        type: String,

        enum: [
            "none",
            "pending",
            "approved",
            "rejected"
        ],

        default: "none"
    },

    tokenVersion: {
        type: Number,
        default: 0
    },

    

    appealHistory: [

        {

            status: {
                type: String
            },

            reason: {
                type: String
            },

            date: {
                type: Date,
                default: Date.now
            }

        }

    ],

    appealRejectCount: {
        type: Number,
        default: 0
    },

    lastAppealRejectedAt: {

        type: Date

    },
},
    { timestamps: true }
)

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;