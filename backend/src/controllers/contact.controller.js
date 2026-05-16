const Contact = require("../models/contact.model");


// ================= SEND MESSAGE =================

const sendContactMessage = async (req, res) => {

  try {

    const {
      name,
      email,
      userType,
      issueType,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !issueType ||
      !message
    ) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }

    const newMessage = await Contact.create({

      name,
      email,
      userType,
      issueType,
      message,

    });

    res.status(201).json({

      success: true,
      message: "Message sent successfully",
      newMessage,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// ================= GET ALL CONTACTS =================

const getAllContacts = async (req, res) => {

  try {

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,
      contacts,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// ================= MARK MESSAGE AS READ =================

const markMessageAsRead = async (req, res) => {

  try {

    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {

      return res.status(404).json({
        message: "Message not found",
      });

    }

    contact.status = "Read";

    await contact.save();

    res.status(200).json({

      success: true,
      message: "Message marked as read",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


module.exports = {

  sendContactMessage,
  getAllContacts,
  markMessageAsRead,

};