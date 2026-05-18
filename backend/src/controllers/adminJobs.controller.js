const postedJobModel = require("../models/postedJob.model");


// ================= GET ALL JOBS =================

async function adminJobsController(req, res) {

  try {

    const jobs = await postedJobModel.find();

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

}


// ================= DELETE JOB =================

async function deleteJob(req, res) {

  try {

    const { id } = req.params;

    await postedJobModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Job removed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

}

// ================= GET SINGLE JOB =================

async function getSingleJob(req, res) {

  try {

    const { id } = req.params;

    const job = await postedJobModel.findById(id);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    res.status(200).json({
      success: true,
      job
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

}

module.exports = {
  adminJobsController,
  deleteJob,
  getSingleJob
};