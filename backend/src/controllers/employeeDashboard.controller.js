const userModel = require("../models/user.model");

const postedJobModel =
require("../models/postedJob.model");

const employeeProfileModel =
require("../models/employeeProfile.model");

const applicationModel =
require("../models/application.model");

async function employeeDashboardController(
  req,
  res
) {

  try {

    // logged in user

    const userId =
      req.user.id;

    // employee profile

    const profile =
      await employeeProfileModel.findOne({
        userId,
      });

    // employee skills

    const employeeSkills =
      profile?.skills || [];

    // all active jobs

    const jobs =
      await postedJobModel.find({
        status: "Active",
      });

    // skill matching

    const matchedJobs =
      jobs.map((job) => {

       const jobSkills =

      typeof job.skills ===
      "string"

    ? job.skills
        .split(/[ ,]+/)
        .map((skill) =>
          skill
            .trim()
            .toLowerCase()
        )
        .filter(Boolean)

    : Array.isArray(job.skills)

    ? job.skills.map((skill) =>
        skill.toLowerCase()
      )

    : [];

        const matchedCount =
          jobSkills.filter((skill) =>

            employeeSkills.some(
              (empSkill) =>

                empSkill
                  .toLowerCase()
                  .includes(
                    skill.toLowerCase()
                  ) ||

                skill
                  .toLowerCase()
                  .includes(
                    empSkill.toLowerCase()
                  )
            )

          ).length;

        return {

          ...job.toObject(),

          matchedCount,
        };
      });

    // highest matches first

    matchedJobs.sort(
      (a, b) =>

        b.matchedCount -
        a.matchedCount
    );

    // suggested jobs

    // suggested jobs based on skill match

let suggestedJobs =
  matchedJobs
    .filter(
      (job) =>
        job.matchedCount > 0
    )
    .slice(0, 5);

// fallback only if absolutely no matches

if (suggestedJobs.length === 0) {

  suggestedJobs = jobs

    .filter((job) => {

      // remove jobs without skills

      if (!job.skills) return false;

      // avoid accountant/random jobs

      return (
        job.skills.trim() !== ""
      );
    })

    .slice(0, 5);
}

    // applications

    const applications =
      await applicationModel.find({
        employeeId: userId,
      });

    // weekly chart data

    const weeklyData = [

      { day: "Mon", jobs: 0 },
      { day: "Tue", jobs: 0 },
      { day: "Wed", jobs: 0 },
      { day: "Thu", jobs: 0 },
      { day: "Fri", jobs: 0 },
      { day: "Sat", jobs: 0 },
      { day: "Sun", jobs: 0 },

    ];

    // count applications by weekday

    applications.forEach((app) => {

      const date =
        new Date(app.createdAt);

      const day =
        date.getDay();

      const map = {

        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
      };

      const dayName =
        map[day];

      const existing =
        weeklyData.find(
          (d) =>
            d.day === dayName
        );

      if (existing) {

        existing.jobs += 1;
      }
    });

    // response

    res.status(200).json({

      message:
        "Employee dashboard accessed successfully",

      user: req.user,

       profile,

      suggestedJobs,

      skills: employeeSkills,

      weeklyData,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
}

module.exports = {
  employeeDashboardController,
};