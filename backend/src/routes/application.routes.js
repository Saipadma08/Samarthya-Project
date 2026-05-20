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

  getApplicationStatus,

  markApplicationCompleted,

  verifyCompletedJob,

  denyCompletedJob

} = require(
  "../controllers/application.controller"
);



// APPLY JOB

router.post(

  "/apply",

  authMiddleware,

  applyForJob
);



// EMPLOYEE APPLICATIONS

router.get(

  "/employee",

  authMiddleware,

  getEmployeeApplications
);



// EMPLOYER APPLICATIONS

router.get(

  "/employer",

  authMiddleware,

  getEmployerApplicants
);



// UPDATE STATUS

router.patch(

  "/status/:applicationId",

  authMiddleware,

  updateApplicationStatus
);



// GET APPLICATION STATUS

router.get(

  "/status/:jobId",

  authMiddleware,

  getApplicationStatus
);



// MARK COMPLETED

router.patch(

  "/complete",

  authMiddleware,

  markApplicationCompleted
);


router.patch(

"/verify-completion/:id",

authMiddleware,

verifyCompletedJob

);



router.patch(

"/deny-completion/:id",

authMiddleware,

denyCompletedJob

);

module.exports = router;