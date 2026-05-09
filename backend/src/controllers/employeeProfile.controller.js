const User = require("../models/user.model");
const EmployeeProfile = require("../models/employeeProfile.model");
const uploadFile = require("../services/storage.service");

async function employeeProfileController(req, res) {
  try {
    res.status(200).json({
      message: "Employee profile accessed successfully",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
}

// GET profile
async function getProfile(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("name email profileImage isVerified");

    const profile = await EmployeeProfile.findOne({ userId });

    res.json({
      user,
      profile
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// UPDATE profile
async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    let profileImageUrl;
    let coverImageUrl;

    // Upload profile image (if exists)
    if (req.files?.profileImage?.[0]) {

      const file = req.files.profileImage[0];

      // allowed image types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      // image validation
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: "Only JPG, PNG, and WEBP images are allowed"
        });
      }

      const result = await uploadFile(
        file.buffer,
        file.originalname,
        "/samarthya/profile-images"
      );

      profileImageUrl = result.url;
    }

    // Upload cover image (if exists)
    if (req.files?.coverImage?.[0]) {

      const file = req.files.coverImage[0];

      // allowed image types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      // image validation
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: "Only JPG, PNG, and WEBP images are allowed"
        });
      }

      const result = await uploadFile(
        file.buffer,
        file.originalname,
        "/samarthya/cover-images"
      );

      coverImageUrl = result.url;
    }

    const {
      name,
      email,
      phone,
      category,
      jobType,
      location,
      openToWork,
      about,
      skills
    } = req.body;

    // Update USERS collection
    await User.findByIdAndUpdate(userId, {
      name,
      email,
      ...(profileImageUrl && { profileImage: profileImageUrl })
    });

    // Parse skills safely
    const parsedSkills = Array.isArray(skills)
      ? skills
      : skills
        ? skills.split(",").map(s => s.trim())
        : [];

    // Update EMPLOYEE PROFILE
    const updatedProfile = await EmployeeProfile.findOneAndUpdate(
      { userId },
      {
        phone,
        category,
        jobType,
        location,
        openToWork,
        about,
        skills: parsedSkills,
        ...(coverImageUrl && { coverImage: coverImageUrl })
      },
      { upsert: true, returnDocument: "after" }
    );

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });

  } catch (err) {
    // duplicate email error
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { employeeProfileController, getProfile, updateProfile };