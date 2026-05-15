const SavedJob =
  require(
    "../models/savedJob.model"
  );

const saveJob =
  async (req, res) => {

    try {

      const {
        jobId
      } = req.body;

      const alreadySaved =
        await SavedJob.findOne({

          employeeId:
            req.user.id,

          jobId,
        });

      if (alreadySaved) {

        await SavedJob.findByIdAndDelete(

          alreadySaved._id
        );

        return res.status(200).json({

          success: true,

          message:
            "Job removed from saved jobs",
        });
      }

      await SavedJob.create({

        employeeId:
          req.user.id,

        jobId,
      });

      res.status(201).json({

        success: true,

        message:
          "Job saved successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

const getSavedJobs =
  async (req, res) => {

    try {

      const jobs =
        await SavedJob.find({

          employeeId:
            req.user.id,
        }).populate("jobId");

      res.status(200).json({

        success: true,

        jobs,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

module.exports = {

  saveJob,

  getSavedJobs,
};