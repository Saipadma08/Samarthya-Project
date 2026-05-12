const express = require("express");

const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );

const router =
  express.Router();

const {

  applyForJob,

  getEmployeeApplications,

  getEmployerApplicants,

  updateApplicationStatus,

} = require(
  "../controllers/application.controller"
);

router.post(

  "/apply",

  authMiddleware,

  applyForJob
);

router.get(

  "/employee",

  authMiddleware,

  getEmployeeApplications
);

router.get(

  "/employer",

  authMiddleware,

  getEmployerApplicants
);

router.patch(

  "/status/:applicationId",

  authMiddleware,

  updateApplicationStatus
);

module.exports = router;