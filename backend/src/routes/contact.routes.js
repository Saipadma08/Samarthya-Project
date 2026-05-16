const express = require("express");

const router = express.Router();

const {
  sendContactMessage,
  getAllContacts,
  markMessageAsRead,
} = require("../controllers/contact.controller");


// ================= PUBLIC =================

router.post(
  "/send",
  sendContactMessage
);


// ================= ADMIN =================

router.get(
  "/all",
  getAllContacts
);


// ================= MARK READ =================

router.put(
  "/:id/read",
  markMessageAsRead
);

module.exports = router;