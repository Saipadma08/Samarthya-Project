const mongoose =
  require("mongoose");

const savedJobSchema =
  new mongoose.Schema(

    {

      employeeId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      jobId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "PostedJob",

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SavedJob",
    savedJobSchema
  );