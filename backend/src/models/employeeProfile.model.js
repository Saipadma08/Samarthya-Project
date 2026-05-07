const mongoose = require("mongoose");

const employeeProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    phone: String,
    coverImage: String,
    category: String,
    jobType: String,

    location: String,
    openToWork: Boolean,

    about: String,
    skills: [String]

}, 
{ timestamps: true}
)

const employeeProfilesModel = mongoose.model("employeeprofiles", employeeProfileSchema);

module.exports = employeeProfilesModel;