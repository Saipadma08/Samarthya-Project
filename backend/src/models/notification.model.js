const mongoose = require("mongoose");

const notificationSchema =
    new mongoose.Schema(

        {

            receiver: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "users",

                required: true
            },

            sender: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "users"
            },

            type: {

                type: String,

                enum: [
                    "connection_request",
                    "request_accepted",
                    "message",
                    "job_completion_request",
                    "job_completion_verified",
                    "job_completion_denied"
                ],

                required: true
            },

            text: {
                type: String
            },

            read: {

                type: Boolean,

                default: false
            }

        },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "Notification",
        notificationSchema
    );