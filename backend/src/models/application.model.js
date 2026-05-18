const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostedJob",
      required: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "In Progress",
        "Completion Requested",
        "Completed"
      ],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);