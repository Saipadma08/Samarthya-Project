const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  employerType: {
    type: String,
    required: true
  },

  companyName: {
    type: String,
    default: ""
  },

  location: String,

  gender: String,

  phone: String,

  about: String,

  coverImage: String,

  jobCategories: [String],

  jobsPosted: {
    type: Number,
    default: 0
  },

  workersHired: {
    type: Number,
    default: 0
  },

  trustScore: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "EmployerProfile",
  employerProfileSchema
);