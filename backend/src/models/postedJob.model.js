const mongoose = require("mongoose");

const postedJobSchema = new mongoose.Schema(
  {
    employerId: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    payment: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    urgency: {
      type: String,
      default: "Normal",
    },

    jobType: {
      type: String,
      default: "One-time",
    },

    workersNeeded: {
      type: Number,
      default: 1,
    },

    skills: {
      type: String,
    },

    status: {
      type: String,
      default: "Active",
    },

    action: {
      type: String,
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PostedJob",
  postedJobSchema
);
