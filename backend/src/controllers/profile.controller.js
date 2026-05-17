const User = require("../models/user.model");
const EmployeeProfile =
require("../models/employeeProfile.model");

const EmployerProfile =
require("../models/employerProfile.model");

const PostedJob =
require("../models/postedJob.model");

const Application =
require("../models/application.model");


async function getPublicProfile(req,res){

 try{

   const { userId } =
   req.params;

   const user =
   await User.findById(userId)
   .select(
     "name email role profileImage isVerified"
   );

   if(!user){

      return res.status(404).json({
         message:"User not found"
      });
   }

   let profile = null;

   if(user.role==="employee"){

      profile =
      await EmployeeProfile.findOne({
         userId
      });

   }

   else if(user.role==="employer"){

      profile =
      await EmployerProfile.findOne({
         userId
      });

      // NEW
      const jobsPosted =
      await PostedJob.countDocuments({

         employerId:userId
      });

      const workersHired =
      await Application.countDocuments({

         employerId:userId,

         status:"Accepted"
      });

      profile = {

         ...profile?._doc,

         jobsPosted,
         workersHired
      };
   }

   res.json({
      user,
      profile
   });

 }catch(err){

   console.log(err);

   res.status(500).json({
      message:"Server error"
   });
 }
}

module.exports={
   getPublicProfile
};