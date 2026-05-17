const Message = require("../models/message.model");

const User = require("../models/user.model");

const Connection = require("../models/connection.model");

const Notification = require("../models/notification.model");

const { io, getReceiverSocketId } = require("../socket/socket");

const uploadFile = require("../services/storage.service");



async function sendMessage(req, res) {

  try {

    const senderId =
      req.user.id;

    const receiverId =
      req.params.userId;

    const text =
      req.body?.text || "";



    const sender =
      await User.findById(senderId);

    const receiver =
      await User.findById(receiverId);



    if (!sender || !receiver) {

      return res.status(404).json({
        message: "User not found"
      });

    }



    const bothAdmins =
      sender.role === "admin" &&
      receiver.role === "admin";


    if (!bothAdmins) {

      if (
        sender.role === "admin" ||
        receiver.role === "admin"
      ) {

        return res.status(403).json({
          message:
            "Messaging not allowed"
        });

      }


      const connection =
        await Connection.findOne({

          status: "accepted",

          $or: [

            {
              senderId,
              receiverId
            },

            {
              senderId: receiverId,
              receiverId: senderId
            }

          ]

        });


      if (!connection) {

        return res.status(403).json({
          message: "Connect first"
        });

      }

    }


    let imageUrl = "";


    if (req.file) {

      const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp"

      ];


      if (
        !allowedTypes.includes(
          req.file.mimetype
        )
      ) {

        return res.status(400)
          .json({

            message:
              "Only images allowed"

          });

      }


      const result =
        await uploadFile(

          req.file.buffer,

          req.file.originalname,

          "/samarthya/chat-images"

        );


      imageUrl =
        result.url;

    }


    const message =
      await Message.create({

        sender: senderId,

        receiver: receiverId,

        text,

        image: imageUrl

      });



    const socketId =
      getReceiverSocketId(
        receiverId
      );

    console.log(
      "Sender:",
      senderId
    );

    console.log(
      "Receiver:",
      receiverId
    );

    console.log(
      "Receiver socket:",
      socketId
    );


    if (socketId) {

      console.log(
        "Emitting notification..."
      );

      io()
        .to(socketId)
        .emit(
          "receiveMessage",
          message
        );

      io()
        .to(socketId)
        .emit(
          "newUnreadChat",
          {
            sender: senderId
          }
        );

    }
    else {

      console.log(
        "Receiver offline / socket not found"
      );

    }


    res.json(message);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server error"

    });

  }

}




async function getMessages(
  req,
  res
) {

  try {

    const currentUserId = req.user.id;

    const otherUserId = req.params.userId;


    const messages =

      await Message.find({

        $or: [

          {

            sender: currentUserId,

            receiver: otherUserId

          },

          {

            sender: otherUserId,

            receiver: currentUserId

          }

        ]

      })

        .sort({

          createdAt: 1

        });


    res.json(
      messages
    );

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error"

    });

  }

}



async function getChatUsers(
  req,
  res
) {

  try {

    const currentUserId =
      req.user.id;


    const messages =
      await Message.find({

        $or: [

          {
            sender: currentUserId
          },

          {
            receiver: currentUserId
          }

        ]

      })

        .sort({
          createdAt: -1
        })

        .populate(
          "sender receiver",
          "name profileImage role"
        );


    const uniqueUsers =
      new Map();


    messages.forEach(
      (message) => {

        const otherUser =

          message.sender._id.toString()

            ===

            currentUserId

            ?

            message.receiver

            :

            message.sender;


        if (

          !uniqueUsers.has(

            otherUser._id.toString()

          )

        ) {

          uniqueUsers.set(

            otherUser._id.toString(),

            {

              ...otherUser.toObject(),

              lastMessage:
                message.text,

              createdAt:
                message.createdAt

            }

          );

        }

      }

    );


    res.json(

      Array.from(

        uniqueUsers.values()

      )

    );

  }

  catch (err) {

    console.log(err);

    res.status(500)
      .json({

        message:
          "Server error"

      });

  }

}


async function sendLocation(req, res) {

  try {

    const sender = req.user.id;

    const receiver = req.params.userId;

    const {
      latitude,
      longitude
    } = req.body;


    const newMessage =
      await Message.create({

        sender,
        receiver,

        location: {
          latitude,
          longitude
        }

      });


    const socketId =
      getReceiverSocketId(receiver);

    if (socketId) {

      io()
        .to(socketId)
        .emit(
          "receiveMessage",
          newMessage
        );

      io()
        .to(socketId)
        .emit(
          "newUnreadChat",
          {
            sender
          }
        );

    }

    res.json(newMessage);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "server error"
    });

  }

}


async function deleteChat(req, res) {

  try {

    const currentUserId =
      req.user.id;

    const otherUserId =
      req.params.userId;

    await Message.deleteMany({

      $or: [

        {
          sender: currentUserId,
          receiver: otherUserId
        },

        {
          sender: otherUserId,
          receiver: currentUserId
        }

      ]

    });

    res.json({
      message: "Chat deleted"
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}


module.exports = { sendMessage, getMessages, getChatUsers, sendLocation, deleteChat };