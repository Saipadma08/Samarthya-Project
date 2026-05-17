const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const {sendMessage, getMessages, getChatUsers, sendLocation, deleteChat} = require("../controllers/message.controller");

const multer=require("multer");

const upload=multer({storage:multer.memoryStorage()});


router.post("/send/:userId", authMiddleware, upload.single("image"), sendMessage);

router.get("/chat-users", authMiddleware, getChatUsers);

router.get("/:userId", authMiddleware, getMessages);

router.post("/send-location/:userId", authMiddleware, sendLocation);

router.delete("/delete-chat/:userId", authMiddleware, deleteChat);


module.exports = router;