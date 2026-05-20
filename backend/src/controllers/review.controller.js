const Review =
  require("../models/review.model");

const Application =
  require("../models/application.model");



const submitReview =
  async (req, res) => {

    try {

      const {

        applicationId,

        rating,

        review,

      } = req.body;

      const reviewerId =
        req.user.id;

      const application =
        await Application.findById(
          applicationId
        );

      if (!application) {

        return res.status(404).json({

          message:
            "Application not found",
        });
      }

      let receiverId;

      // employee reviewing employer

     if (
  !application.employeeId ||
  !application.employerId
) {

  return res.status(400).json({

    message:
      "Application user data missing"
  });
}

if (
  reviewerId.toString() ===
  application.employeeId.toString()
) {

  receiverId =
    application.employerId;
}

else {

  receiverId =
    application.employeeId;
}

      const existingReview =
        await Review.findOne({

          applicationId,

          reviewerId,
        });

      if (existingReview) {

        return res.status(400).json({

          message:
            "Review already submitted",
        });
      }

      const newReview =
        await Review.create({

          applicationId,

          reviewerId,

          receiverId,

          rating,

          review,
        });

      res.status(201).json({

        success: true,

        newReview,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });

    }

  };



const getReviewsByUser =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const reviews =
        await Review.find({

          receiverId: userId,
        })

          .populate(
            "reviewerId",
            "name profileImage"
          )

          .sort({
            createdAt: -1,
          });

      const totalRatings =
        reviews.reduce(

          (acc, item) =>

            acc + item.rating,

          0
        );

      const trustScore =
        reviews.length > 0

          ? (
              totalRatings /
              reviews.length
            ).toFixed(1)

          : 0;

      res.status(200).json({

        success: true,

        reviews,

        trustScore,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });

    }

  };

const getTrustScore =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const reviews =
        await Review.find({

          receiverId: userId,
        });

      const totalRatings =
        reviews.reduce(

          (acc, item) =>

            acc + item.rating,

          0
        );

      const trustScore =
        reviews.length > 0

          ? (
              totalRatings /
              reviews.length
            ).toFixed(1)

          : 0;

      res.status(200).json({

        success: true,

        trustScore,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });

    }

  };

module.exports = {
  submitReview,
  getReviewsByUser,
  getTrustScore
};