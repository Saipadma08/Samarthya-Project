const userModel = require("../models/user.model");
const Notification = require("../models/notification.model");


// ================= GET ALL USERS =================

async function adminUsersController(req, res) {

  try {

    const users = await userModel
      .find()
      .select("-password");

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

}


// ================= GET SINGLE USER =================

async function getSingleUser(req, res) {

  try {

    const user = await userModel
      .findById(req.params.id)
      .select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

}


async function blockUser(
  req,
  res
) {

  try {

    const {

      reason

    } = req.body;

    const user =

      await userModel.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404)
        .json({

          message:
            "User not found"

        });

    }

    user.isBlocked = true;

    user.blockReason =
      reason;

    user.blockedAt =
      new Date();

    user.blockedBy =
      req.user.id;

    // instant logout
    user.tokenVersion += 1;

    await user.save();

    res.json({

      message:
        "User blocked"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500)
      .json({

        message:
          "Server error"

      });

  }

}


async function unblockUser(
  req,
  res
) {

  try {

    const user =

      await userModel.findById(
        req.params.id
      );

    user.isBlocked = false;

    user.blockReason = null;

    user.blockedAt = null;

    await user.save();

    await Notification.create({

      receiver: user._id,

      sender: req.user.id,

      type:
        "account_unblocked",

      text:
        "Your account has been restored"

    });

    res.json({

      message:
        "User unblocked"

    });

  }

  catch (error) {

    console.log(error);

  }

}


async function suspendUser(
  req,
  res
) {

  try {

    let {
      reason,
      days
    } = req.body;


    // convert to number
    days = Number(days);


    // validation
    if(
      !days ||
      days < 1
    ){

      return res.status(400)
      .json({

        message:
        "Suspension days must be at least 1"

      });

    }


    const user =

      await userModel.findById(
        req.params.id
      );

    if(!user){

      return res.status(404)
      .json({

        message:
        "User not found"

      });

    }


    const endDate =
      new Date();

    endDate.setDate(

      endDate.getDate()

      +

      days

    );


    user.isSuspended = true;

    user.suspensionReason =
      reason;

    user.suspensionEndsAt =
      endDate;


    // instant logout
    user.tokenVersion += 1;


    await user.save();


    console.log(
      "Suspension ends:",
      endDate
    );


    res.json({

      message:
      "Suspended"

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
      "Server error"

    });

  }

}


async function removeSuspension(
  req,
  res
) {

  try {

    const user =

      await userModel.findById(
        req.params.id
      );

    user.isSuspended = false;

    user.suspensionEndsAt = null;

    user.suspensionReason = null;

    await user.save();

    await Notification.create({

      receiver: user._id,

      sender: req.user.id,

      type:
        "suspension_removed",

      text:
        "Your suspension has been removed"

    });

    res.json({

      message:
        "Suspension removed"

    });

  }

  catch (error) {

    console.log(error);

  }

}


module.exports = {
  adminUsersController,
  getSingleUser,
  blockUser,
  unblockUser,
  suspendUser,
  removeSuspension
};