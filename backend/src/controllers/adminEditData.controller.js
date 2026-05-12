const userModel = require("../models/user.model");
const uploadFile = require("../services/storage.service");

async function editAdminData(req, res) {

    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { name, email } = req.body;

        // validation
        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        let profileImageUrl;

        // upload profile image to ImageKit
        if (req.file) {

            const file = req.file;

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
                "/samarthya/admin-profile-images"
            );

            profileImageUrl = result.url;
        }

        // update admin
        const updatedAdmin = await userModel.findByIdAndUpdate(

            req.user.id,

            {
                name,
                email,

                ...(profileImageUrl && {
                    profileImage: profileImageUrl
                })

            },

            { returnDocument: "after" }

        ).select("-password");

        res.status(200).json({
            message: "Admin data updated successfully",
            user: updatedAdmin
        });

    }

    catch (err) {

        // duplicate email error
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}

module.exports = { editAdminData };