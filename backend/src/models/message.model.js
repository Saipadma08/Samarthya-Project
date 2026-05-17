const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {

        sender: {

            type:mongoose.Schema.Types.ObjectId,

            ref: "users",

            required: true

        },

        receiver: {

            type:mongoose.Schema.Types.ObjectId,

            ref: "users",

            required: true

        },

        text: {

            type: String,

        },

        image:{
            type:String
        },

        location:{
            latitude:Number,
            longitude:Number
        }

    },

    {
        timestamps: true
    }

);

module.exports =
    mongoose.model(
        "Message",
        messageSchema
    );