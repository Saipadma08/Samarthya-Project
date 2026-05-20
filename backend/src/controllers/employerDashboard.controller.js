const Job = require("../models/postedJob.model");
const Application = require("../models/application.model");

const employerDashboardController = async (req, res) => {

  try {

    const employerId = req.user._id;

    // RECENT JOBS
    const recentJobs = await Job.find({
      employer: employerId,
    })
      .sort({ createdAt: -1 })
      .limit(4);

      // RECENT APPLICANTS
     const recentApplicants =
        await Application.find({
          employerId: employerId,
        })
          .populate({
            path: "employeeId",
            model: "users",
          })
          .sort({ createdAt: -1 })
          .limit(3);
    // TOTAL APPLICATIONS
    const totalApplications =
      await Application.countDocuments({
        employer: employerId,
      });

    res.status(200).json({
    success: true,
    recentJobs,
    recentApplicants,
    totalApplications,
  });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = employerDashboardController;