const User =
require("../models/user.model");

const Notification =
require("../models/notification.model");


const applyVerification =
async(req,res)=>{

try{

const user=

await User.findById(
req.user.id
);

if(!user){

return res.status(404)
.json({

message:
"User not found"

});

}


if(

user.verificationStatus==="pending"

){

return res.status(400)
.json({

message:
"Already applied"

});

}


if(

user.verificationStatus==="approved"

){

return res.status(400)
.json({

message:
"Already verified"

});

}


user.verificationStatus=
"pending";

await user.save();


const admins=

await User.find({

role:"admin"

});


for(const admin of admins){

await Notification.create({

receiver:
admin._id,

sender:
user._id,

type:
"verification_request",

text:
`${user.name} requested verification`

});

}


res.json({

message:
"Verification request sent"

});

}

catch(err){

console.log(err);

res.status(500)
.json({

message:
"Server error"

});

}

};



const getVerificationUsers=
async(req,res)=>{

try{

if(req.user.role!=="admin"){

return res.status(403)
.json({

message:
"Admin only"

});

}

const users=

await User.find({

verificationStatus:
"pending"

});

res.json(users);

}

catch(err){

console.log(err);

}

};



const verificationAction=
async(req,res)=>{

try{

if(req.user.role!=="admin"){

return res.status(403)
.json({

message:
"Admin only"

});

}


const {action}=req.body;


const user=

await User.findById(
req.params.id
);


if(!user){

return res.status(404)
.json({

message:
"User not found"

});

}


if(action==="approve"){

user.isVerified=true;

user.verificationStatus=
"approved";

}

else{

user.isVerified=false;

user.verificationStatus=
"rejected";

}


await user.save();


await Notification.create({

receiver:
user._id,

type:

action==="approve"

?

"verification_approved"

:

"verification_rejected",

text:

action==="approve"

?

"Your profile verified"

:

"Verification rejected"

});


await user.save();

const updatedUser =
await User.findById(
user._id
);

res.json(updatedUser);

}

catch(err){

console.log(err);

}

};



module.exports={

applyVerification,
getVerificationUsers,
verificationAction

};