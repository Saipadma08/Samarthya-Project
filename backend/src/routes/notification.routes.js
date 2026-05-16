const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {getNotifications, markAsRead} = require("../controllers/notification.controller");

const router = express.Router();


router.get("/", authMiddleware, getNotifications);


router.put("/read/:id", authMiddleware, markAsRead);


module.exports = router;