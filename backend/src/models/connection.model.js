const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(

  {

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "blocked"
      ],
      default: "pending"
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Connection",
  connectionSchema
);