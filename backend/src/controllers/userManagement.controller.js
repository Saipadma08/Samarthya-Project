const User =
    require("../models/user.model");

const Notification =
    require("../models/notification.model");

const {
    sendMail
}
    =
    require("../services/mail.service");

async function requestReview(
    req, res
) {

    try {

        const {
            email,
            message
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(404)
                .json({
                    message:
                        "User not found"
                });

        }

        if (
            !user.isBlocked &&
            !user.isSuspended
        ) {

            return res.status(400)
                .json({
                    message:
                        "Account is active"
                });

        }

        if (
            user.deactivationAppealStatus ===
            "pending"
        ) {

            return res.status(400)
                .json({
                    message:
                        "Already requested"
                });

        }

        if (
            user.deactivationAppealStatus ===
            "rejected"
        ) {

            user.deactivationAppealStatus =
                "none";

        }

        user.deactivationAppealStatus =
            "pending";

        await user.save();

        const admins =
            await User.find({
                role: "admin"
            });

        for (const admin of admins) {

            await Notification.create({

                receiver:
                    admin._id,

                sender:
                    user._id,

                type:
                    "review_request",

                text:
                    `${user.name} requested account review.
${message || ""}`

            });

        }

        res.json({

            message:
                "Review request sent"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Server error"

        });

    }

}



async function getReviewUsers(
    req, res
) {

    if (req.user.role !== "admin") {

        return res.status(403).json({

            message: "Admin only"

        });

    }

    const { type } = req.params;

    let users = [];

    if (type === "blocked") {

        users =
            await User.find({

                isBlocked: true,

                deactivationAppealStatus:
                    "pending"

            });

    }

    if (type === "suspended") {

        users =
            await User.find({

                isSuspended: true,

                deactivationAppealStatus:
                    "pending"

            });

    }

    res.json(users);

}



async function reviewAction(
    req, res
) {

    try {

        if (req.user.role !== "admin") {

            return res.status(403).json({

                message: "Admin only"

            });

        }

        const { userId } =
            req.params;

        const { action } =
            req.body;

        const user =
            await User.findById(
                userId
            );

        if (!user) {

            return res.status(404)
                .json({
                    message: "Not found"
                });

        }

        if (action === "approve") {

            user.isBlocked = false;

            user.isSuspended = false;

            user.blockReason = null;

            user.suspensionReason = null;

            user.blockedAt = null;

            user.blockedBy = null;

            user.suspensionEndsAt = null;

            user.deactivationAppealStatus =
                "approved";


            await sendMail(

                user.email,

                "Account Review Approved",

                `Hello ${user.name},

Your account review request
has been approved.

You can log in again.

Samarthya Team`

            );

        }


        if (action === "reject") {

            user.deactivationAppealStatus =
                "rejected";

            user.appealRejectCount =
                (user.appealRejectCount || 0) + 1;

            user.lastAppealRejectedAt =
                new Date();

            user.appealHistory =
                user.appealHistory || [];

            user.appealHistory.push({

                status: "rejected",

                reason:
                    "Admin rejected review request",

                date:
                    new Date()

            });

            await sendMail(

                user.email,

                "Account Review Rejected",

                `Hello ${user.name},

Your review request
was rejected.

Reason:
Admin rejected review request

Please try later.

Samarthya Team`

            );

        }

        await user.save();

        res.json({
            message: "done"
        });

    }

    catch (err) {

        console.log(err);

    }

}



async function getReviewStatus(
    req,
    res
) {

    try {

        const { email } =
            req.query;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(404)
                .json({
                    message:
                        "User not found"
                });

        }

        let accountType = "";

        if (user.isBlocked) {

            accountType = "blocked";

        }

        else if (user.isSuspended) {

            accountType = "suspended";

        }

        res.json({

            email: user.email,

            type: accountType,

            reason:
                user.blockReason ||
                user.suspensionReason,

            until:
                user.suspensionEndsAt,

            appealStatus:
                user.deactivationAppealStatus,

            rejectCount:
                user.appealRejectCount,

            history:
                user.appealHistory

        });

    }

    catch (err) {

        console.log(err);

    }

}



const getDisabledAccounts =
    async (req, res) => {

        try {

            const { type } =
                req.params;

            let users = [];

            if (type === "blocked") {

                users =
                    await User.find({

                        isBlocked: true

                    });

            }

            else if (
                type === "suspended"
            ) {

                users =
                    await User.find({

                        isSuspended: true

                    });

            }

            res.status(200)
                .json(users);

        }

        catch (err) {

            console.log(err);

            res.status(500)
                .json({

                    message:
                        "Server error"

                });

        }

    };


const unblockUser =
    async (req, res) => {

        try {

            await User.findByIdAndUpdate(

                req.params.id,

                {

                    isBlocked: false,

                    blockReason: null,

                    blockedAt: null,

                    blockedBy: null,

                    deactivationAppealStatus:
                        "none"

                }

            );

            res.json({
                success: true
            });

        } catch (err) {

            console.log(err);

            res.status(500)
                .json({
                    message: "Server error"
                });

        }

    };



const removeSuspension =
    async (req, res) => {

        try {

            await User.findByIdAndUpdate(

                req.params.id,

                {

                    isSuspended: false,

                    suspensionEndsAt: null,

                    suspensionReason: null,

                    deactivationAppealStatus:
                        "none"

                }

            );

            res.json({
                success: true
            });

        } catch (err) {

            console.log(err);

            res.status(500)
                .json({
                    message: "Server error"
                });

        }

    };



module.exports = { requestReview, 
    getReviewUsers, 
    reviewAction, 
    getReviewStatus, 
    getDisabledAccounts, 
    unblockUser, 
    removeSuspension,
};