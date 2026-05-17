const PostedJob = require(
  "../models/postedJob.model"
);

const EmployerProfile = require(
  "../models/employerProfile.model"
);

const User = require(
  "../models/user.model"
);

const Application = require(
  "../models/application.model"
);

const createPostedJob = async (
  req,
  res
) => {

  try {

    const newJob =
      await PostedJob.create({

        employerId:
          req.user.id,

        category:
          req.body.category,

        title:
          req.body.title,

        description:
          req.body.description,

        payment:
          req.body.payment,

        location:
          req.body.location,

        urgency:
          req.body.urgency,

        jobType:
          req.body.jobType,

        workersNeeded:
          req.body.workersNeeded,

        skills:
          req.body.skills,

        status: "Active",

        action: "Pending",
      });

    res.status(201).json({

      success: true,

      message:
        "Job posted successfully",

      job: newJob,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

const getAllPostedJobs = async (
  req,
  res
) => {

  try {

    const jobs =
      await PostedJob.find({

        employerId:
          req.user.id,
      }).sort({

        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

const getEmployerJobs =
  async (req, res) => {

    try {

      const jobs =
        await PostedJob.find({

          employerId:
            req.user.id,
        }).sort({

          createdAt: -1,
        });

      const jobsWithApplications =
        await Promise.all(

          jobs.map(
            async (job) => {

              const applications =
                await Application.find({

                  job:
                    job._id,
                });

              return {

                ...job._doc,

                applications,
              };
            }
          )
        );

      res.status(200).json({

        success: true,

        jobs:
          jobsWithApplications,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };

const updateJobStatus = async (
  req,
  res
) => {

  try {

    const updatedJob =
      await PostedJob.findByIdAndUpdate(

        req.params.jobId,

        {
          status:
            req.body.status,
        },

        {
          new: true,
        }
      );

    res.status(200).json({

      success: true,

      job: updatedJob,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

const getAllJobsForEmployees =
  async (req, res) => {

    try {

      const EmployeeProfile =
        require(
          "../models/employeeProfile.model"
        );

      const employeeProfile =
        await EmployeeProfile.findOne({

          userId:
            req.user.id,
        });

      const employeeCategory =
        employeeProfile?.category
          ?.toLowerCase();

      let allowedCategories =
        [];

      if (
        employeeCategory ===
        "low"
      ) {

        allowedCategories = [
          "low",
        ];
      }

      if (
        employeeCategory ===
        "medium"
      ) {

        allowedCategories = [
          "medium",
        ];
      }

      if (
        employeeCategory ===
        "high"
      ) {

        allowedCategories = [
          "high",
        ];
      }

      const jobs =
        await PostedJob.find({

          status: "Active",
        }).sort({

          createdAt: -1,
        });

      const filteredJobs =
        jobs.filter((job) =>

          allowedCategories.includes(

            job.category
              ?.toLowerCase()
          )
        );

      const updatedJobs =
        await Promise.all(

          filteredJobs.map(
            async (job) => {

              const employer =
                await User.findById(

                  job.employerId
                );

              const employerProfile =
                await EmployerProfile.findOne({

                  userId:
                    job.employerId,
                });

              return {

                ...job._doc,

                employerName:
                  employer?.name ||
                  "Employer",

                companyName:
                  employerProfile
                    ?.companyName ||
                  "Independent Employer",
              };
            }
          )
        );

      res.status(200).json({

        success: true,

        jobs: updatedJobs,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,
      });
    }
  };

const getSingleJob = async (
  req,
  res
) => {

  try {

    const job =
      await PostedJob.findById(
        req.params.jobId
      );

    if (!job) {

      return res.status(404).json({

        success: false,

        message: "Job not found",
      });
    }

    const employer =
      await User.findById(
        job.employerId
      ).select(
        "name email profileImage"
      );

    const employerProfile =
      await EmployerProfile.findOne({

        userId:
          job.employerId,
      });

    const updatedJob = {

      ...job._doc,

      employerName:
        employer?.name ||
        "Employer",

      employerImage:
        employer?.profileImage,

      employerEmail:
        employer?.email,

      companyName:
        employerProfile
          ?.companyName ||
        "Independent Employer",

      employerProfile,
    };

    res.status(200).json({

      success: true,

      job: updatedJob,
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

  createPostedJob,

  getAllPostedJobs,

  getEmployerJobs,

  updateJobStatus,

  getAllJobsForEmployees,

  getSingleJob,
};