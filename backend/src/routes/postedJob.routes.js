const express = require("express");

const authMiddleware =
  require("../middlewares/auth.middleware");

const router = express.Router();

const {
  createPostedJob,
  getAllPostedJobs,
  getEmployerJobs,
  updateJobStatus,
  getAllJobsForEmployees,
} = require("../controllers/postedJob.controller");

router.post(
  "/create",
  authMiddleware,
  createPostedJob
);

router.get(
  "/",
  authMiddleware,
  getAllPostedJobs
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
  "/employer",
  authMiddleware,
  getEmployerJobs
);

module.exports = router;