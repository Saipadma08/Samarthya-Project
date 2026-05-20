const mongoose =
  require("mongoose");

const reviewSchema =
  new mongoose.Schema(

    {

      applicationId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "applications",
      },

      reviewerId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "users",
      },

      receiverId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "users",
      },

      rating: {

        type: Number,

        required: true,
      },

      review: {

        type: String,
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "reviews",
    reviewSchema
  );