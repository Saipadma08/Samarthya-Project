const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );

const {

  saveJob,

  getSavedJobs


} = require(
  "../controllers/savedJob.controller"
);

router.post(

  "/save",

  authMiddleware,

  saveJob
);

router.get(

  "/all",

  authMiddleware,

  getSavedJobs
);



module.exports =
  router;