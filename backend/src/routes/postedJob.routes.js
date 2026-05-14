const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const {
  createPostedJob,
  getAllPostedJobs,
  getEmployerJobs,
  updateJobStatus,
  getAllJobsForEmployees,
  getSingleJob,
} = require(
  "../controllers/postedJob.controller"
);

router.post(
  "/create",
  authMiddleware,
  createPostedJob
);

router.get(
  "/employer",
  authMiddleware,
  getEmployerJobs
);

router.get(
  "/all",
  authMiddleware,
  getAllJobsForEmployees
);

router.patch(
  "/status/:jobId",
  authMiddleware,
  updateJobStatus
);

router.get(
  "/:jobId",
  authMiddleware,
  getSingleJob
);

module.exports = router;