const express=
require("express");

const authMiddleware=
require("../middlewares/auth.middleware");

const{

applyVerification,
getVerificationUsers,
verificationAction

}=require(
"../controllers/verification.controller"
);

const router=
express.Router();


router.post(
"/apply",
authMiddleware,
applyVerification
);


router.get(
"/",
authMiddleware,
getVerificationUsers
);


router.put(
"/:id",
authMiddleware,
verificationAction
);


module.exports=
router;