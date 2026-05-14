const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(

    {

        blocker: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true

        },

        blocked: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "Block",
    blockSchema
);