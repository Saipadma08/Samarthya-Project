const User = require("../models/user.model");
const EmployeeProfile = require("../models/employeeProfile.model");
const EmployerProfile = require("../models/employerProfile.model");
const PostedJob = require("../models/postedJob.model");

function searchController(req, res) {
  res.status(200).json({
    message: "search route protected successfully"
  });
}

async function searchUsers(req, res) {

  try {

    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    // search users
    const users = await User.find({
      name: {
        $regex: query,
        $options: "i"
      },
      role: {
        $in: ["employee", "employer"]
      }
    })
    .select("name role profileImage isVerified");

    // attach profiles
    const results = await Promise.all(

      users.map(async (user) => {

        let profile = null;

        if (user.role === "employee") {

          profile = await EmployeeProfile.findOne({
            userId: user._id
          });

        } else if (user.role === "employer") {

          profile = await EmployerProfile.findOne({
            userId: user._id
          });

        }

        return {
          user,
          profile
        };

      })

    );

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}

async function searchJobs(req, res) {

  try {

    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const jobs = await PostedJob.find({

      $or: [

        {
          title: {
            $regex: query,
            $options: "i"
          }
        },

        {
          category: {
            $regex: query,
            $options: "i"
          }
        },

        {
          location: {
            $regex: query,
            $options: "i"
          }
        }

      ]

    });

    const results = await Promise.all(

    jobs.map(async (job) => {

      const employer = await User.findById(
        job.employerId
      ).select("name profileImage");

      return {
        job,
        employer
      };

    })

  );

  res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}

module.exports = {searchController, searchUsers, searchJobs};