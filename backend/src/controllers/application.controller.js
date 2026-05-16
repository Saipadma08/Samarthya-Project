const Application = require(
  "../models/application.model"
);

const PostedJob = require(
  "../models/postedJob.model"
);

const User = require(
  "../models/user.model"
);

const EmployeeProfile = require(
  "../models/employeeProfile.model"
);

const EmployerProfile = require(
  "../models/employerProfile.model"
);

const applyForJob = async (
  req,
  res
) => {

  try {

    const job =
      await PostedJob.findById(
        req.body.jobId
      );

    if (!job) {

      return res.status(404).json({

        success: false,

        message: "Job not found",
      });
    }

    const existingApplication =
      await Application.findOne({

        jobId: req.body.jobId,

        employeeId: req.user.id,
      });

    if (existingApplication) {

      return res.status(400).json({

        success: false,

        message:
          "Already applied for this job",
      });
    }

    const application =
      await Application.create({

        jobId: req.body.jobId,

        employeeId:
          req.user.id,

        employerId:
          job.employerId,
      });

    res.status(201).json({

      success: true,

      message:
        "Application submitted successfully",

      application,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

const getEmployeeApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          employeeId:
            req.user.id,
        }).sort({

          createdAt: -1,
        });

      const updatedApplications =
        await Promise.all(

          applications.map(
            async (
              application
            ) => {

              const job =
                await PostedJob.findById(

                  application.jobId
                );

              const employer =
                await User.findById(

                  application.employerId
                );

              const employerProfile =
                await EmployerProfile.findOne({

                  userId:
                    application.employerId,
                });

              return {

                ...application._doc,

                job,

                employerName:
                  employer?.name ||
                  "Employer",

                companyName:
                  employerProfile?.companyName ||
                  "Independent Employer",
              };
            }
          )
        );

      res.status(200).json({

        success: true,

        applications:
          updatedApplications,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };

const getEmployerApplicants =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          employerId:
            req.user.id,
        }).sort({

          createdAt: -1,
        });

      const updatedApplications =
        await Promise.all(

          applications.map(
            async (
              application
            ) => {

              const employee =
                await User.findById(

                  application.employeeId
                );

              const employeeProfile =
  await EmployeeProfile.findOne({

    userId:
      application.employeeId.toString(),
  });

              const job =
                await PostedJob.findById(

                  application.jobId
                );

              return {

                ...application._doc,

                employeeName:
                  employee?.name ||
                  "Employee",

                employeeEmail:
                  employee?.email ||
                  "",

                // ✅ REAL PROFILE IMAGE
                employeeProfileImage:
                  employee?.profileImage ||
                  "",

                employeeProfile,

                job,
              };
            }
          )
        );

      res.status(200).json({

        success: true,

        applications:
          updatedApplications,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };

const updateApplicationStatus =
  async (req, res) => {

    try {

      const application =
        await Application.findByIdAndUpdate(

          req.params.applicationId,

          {
            status:
              req.body.status,
          },

          {
            returnDocument: "after",
          }
        );

      res.status(200).json({

        success: true,

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };
  // GET APPLICATION STATUS

const getApplicationStatus =
  async (req, res) => {

    try {

      const { jobId } =
        req.params;

      const application =
        await Application.findOne({

          employeeId:
            req.user.id,

          jobId,
        });

      res.status(200).json({

        success: true,

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };



// MARK WORK AS COMPLETED

const markApplicationCompleted =
  async (req, res) => {

    try {

      const { jobId } =
        req.body;

      const application =
        await Application.findOneAndUpdate(

          {
            employeeId:
              req.user.id,

            jobId,
          },

          {
            status:
              "Completed",
          },

          {
            new: true,
          }
        );

      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",
        });
      }

      res.status(200).json({

        success: true,

        message:
          "Work marked as completed",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };

module.exports = {

  applyForJob,

  getEmployeeApplications,

  getEmployerApplicants,

  updateApplicationStatus,

  getApplicationStatus,

  markApplicationCompleted,
};