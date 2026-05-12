const userModel = require("../models/user.model");

async function cleanupUnverifiedUsers() {

    try {

        const thirtyMinutesAgo =
            new Date(Date.now() - 30 * 60 * 1000);

        const deletedUsers =
            await userModel.deleteMany({

                emailVerified: false,

                verificationCreatedAt: {
                    $lt: thirtyMinutesAgo
                }

            });

        console.log(
            `${deletedUsers.deletedCount} unverified users deleted`
        );

    }

    catch (err) {

        console.log(
            "Cleanup error:",
            err
        );

    }

}

module.exports = cleanupUnverifiedUsers;