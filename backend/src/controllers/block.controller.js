const Block = require("../models/block.model");
const Connection = require("../models/connection.model");


// block user
async function blockUser(req, res) {

    try {

        const blockerId = req.user.id;

        const blockedUserId =
            req.params.userId;


        // cannot block self
        if (blockerId === blockedUserId) {

            return res.status(400).json({

                message: "Cannot block yourself"

            });

        }


        // avoid duplicate block
        const existingBlock =
            await Block.findOne({

                blocker: blockerId,
                blocked: blockedUserId

            });

        if (existingBlock) {

            return res.status(400).json({

                message: "User already blocked"

            });

        }


        // remove existing connection/pending request
        await Connection.findOneAndDelete({

            $or: [

                {
                    senderId: blockerId,
                    receiverId: blockedUserId
                },

                {
                    senderId: blockedUserId,
                    receiverId: blockerId
                }

            ]

        });


        // create block
        await Block.create({

            blocker: blockerId,
            blocked: blockedUserId

        });


        res.json({

            message: "User blocked"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server error"

        });

    }

}



// unblock
async function unblockUser(req, res) {

    try {

        await Block.findOneAndDelete({

            blocker: req.user.id,
            blocked: req.params.userId

        });

        res.json({

            message: "User unblocked"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server error"

        });

    }

}



// get blocked users
async function getBlockedUsers(req, res) {

    try {

        const users =
            await Block.find({

                blocker: req.user.id

            })

            .populate(

                "blocked",

                "name role profileImage"

            );


        res.json(users);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server error"

        });

    }

}



module.exports = {

    blockUser,
    unblockUser,
    getBlockedUsers

};