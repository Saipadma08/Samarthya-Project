const userModel = require("../models/user.model");


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


// ================= DELETE USER =================

async function deleteUser(req, res) {

  try {

    const { id } = req.params;

    // CHECK USER EXISTS

    const user = await userModel.findById(id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // DELETE USER

    await userModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

}


module.exports = {
  adminUsersController,
  getSingleUser,
  deleteUser
};