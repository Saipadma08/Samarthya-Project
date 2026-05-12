const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const adminDashboardController = require("../controllers/adminDashboard.controller");

const {addAdmin} = require("../controllers/adminAddAdmin.controller");

const {
  adminJobsController,
  deleteJob,
} = require("../controllers/adminJobs.controller");

const {
  adminUsersController,
  getSingleUser,
  deleteUser,
} = require("../controllers/adminUsers.controller");

const adminReportsController = require("../controllers/adminReports.controller");

const adminEditDataController = require("../controllers/adminEditData.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const adminAnalyticsController = require("../controllers/adminAnalytics.controller");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboardController
);

router.post(
  "/add-admin",
  authMiddleware,
  roleMiddleware("admin"),
  addAdmin
);

router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware("admin"),
  adminJobsController
);

router.delete(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteJob
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  adminUsersController
);

router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getSingleUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

router.get(
  "/reports",
  authMiddleware,
  roleMiddleware("admin"),
  adminReportsController
);

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  adminAnalyticsController
);

router.put(
  "/edit-data",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("profileImage"),
  adminEditDataController.editAdminData
);

module.exports = router;