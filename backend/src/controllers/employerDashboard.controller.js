const Job = require("../models/postedJob.model");
const Application = require("../models/application.model");

const employerDashboardController =
  async (req, res) => {

    try {

      const employerId =
        (req.user._id || req.user.id)
          .toString();

      // RECENT JOBS
      const recentJobs =
        await Job.find({
          employerId: employerId,
        })
          .sort({
            createdAt: -1,
          })
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
          .sort({
            createdAt: -1,
          })
          .limit(3);

      // TOTAL JOBS POSTED
      const totalJobsPosted =
        await Job.countDocuments({
          employerId: employerId,
        });

      // TOTAL APPLICATIONS
      const totalApplications =
        await Application.countDocuments({
          employerId: employerId,
        });

      // ACTIVE JOBS
      const activeJobs =
        await Job.countDocuments({
          employerId: employerId,
          status: "Active",
        });

      // WORKERS HIRED
      const workersHired =
        await Application.countDocuments({
          employerId: employerId,

          status: {
            $in: [
              "In Progress",
              "Completed",
            ],
          },
        });

      res.status(200).json({
        success: true,

        recentJobs,
        recentApplicants,

        totalJobsPosted,
        totalApplications,
        activeJobs,
        workersHired,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
};

module.exports =
  employerDashboardController;