const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const adminDashboardController = require("../controllers/adminDashboard.controller");

const { addAdmin } = require("../controllers/adminAddAdmin.controller");

const {
  adminJobsController,
  deleteJob,
  getSingleJob,
} = require("../controllers/adminJobs.controller");

const {
  adminUsersController,
  getSingleUser,
  blockUser,
  unblockUser,
  suspendUser,
  removeSuspension
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

router.get(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getSingleJob
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


router.put(

  "/users/block/:id",

  authMiddleware,

  roleMiddleware("admin"),

  blockUser

);

router.put(

  "/users/unblock/:id",

  authMiddleware,

  roleMiddleware("admin"),

  unblockUser

);

router.put(

  "/users/suspend/:id",

  authMiddleware,

  roleMiddleware("admin"),

  suspendUser

);

router.put(

  "/users/remove-suspension/:id",

  authMiddleware,

  roleMiddleware("admin"),

  removeSuspension

);


module.exports = router;