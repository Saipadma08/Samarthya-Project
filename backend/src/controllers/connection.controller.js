const Connection = require("../models/connection.model");
const User = require("../models/user.model");
const Block = require("../models/block.model");

const Notification = require("../models/notification.model");

const { io, getReceiverSocketId } = require("../socket/socket");

function connectionController(req, res) {
  res.status(200).json({
    message: "Connection route protected successfully"
  });
}

// send requests
async function sendRequest(req, res) {

  try {

    const senderId = req.user.id;

    const receiverId = req.params.userId;

    // cannot connect to self
    if (senderId === receiverId) {

      return res.status(400).json({
        message: "Cannot connect with yourself"
      });

    }

    // get sender and receiver
    const sender =
      await User.findById(senderId);

    const receiver =
      await User.findById(receiverId);

    // receiver doesn't exist
    if (!receiver) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // admins excluded
    if (
      sender.role === "admin" ||
      receiver.role === "admin"
    ) {

      return res.status(403).json({
        message:
          "Admin connections are not allowed"
      });

    }

    // already exists
    const existingConnection =
      await Connection.findOne({

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

    if (existingConnection) {

      return res.status(400).json({
        message:
          "Connection already exists"
      });

    }

    if (

      existingConnection?.status
      ===
      "blocked"

    ) {

      return res.status(400).json({

        message:
          "User blocked"

      });

    }


    if (

      receiver.blockedUsers.includes(senderId)

    ) {

      return res.status(403).json({

        message:
          "You are blocked"

      });

    }

    const connection =
      await Connection.create({

        senderId,
        receiverId

      });

    const notification =

      await Notification.create({

        receiver: receiverId,

        sender: senderId,

        type: "connection_request",

        text: "sent you a connection request"

      });



    const receiverSocket =

      getReceiverSocketId(receiverId);


    if (receiverSocket) {

      io()

        .to(receiverSocket)

        .emit(

          "newNotification",

          notification

        );

    }



    res.status(201).json({

      message:
        "Connection request sent",

      connection

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}


// accept requests
async function acceptRequest(req, res) {

  try {

    const userId = req.user.id;

    const connection =
      await Connection.findOne({

        _id: req.params.connectionId,

        receiverId: userId,

        status: "pending"

      });

    if (!connection) {

      return res.status(404).json({

        message: "Request not found"

      });

    }

    connection.status = "accepted";

    await connection.save();



    const notification =

      await Notification.create({

        receiver: connection.senderId,

        sender: userId,

        type: "request_accepted",

        text: "accepted your request"

      });


    const senderSocket =

      getReceiverSocketId(connection.senderId);


    if (senderSocket) {

      io()

        .to(senderSocket)

        .emit(

          "newNotification",

          notification

        );

    }



    res.json({

      message: "Connection accepted",

      connection

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error"

    });

  }

}


// reject request
async function rejectRequest(req, res) {

  try {

    const userId = req.user.id;

    const connection =
      await Connection.findOneAndDelete({

        _id: req.params.connectionId,

        receiverId: userId,

        status: "pending"

      });

    if (!connection) {

      return res.status(404).json({

        message:
          "Request not found"

      });

    }

    res.json({

      message:
        "Connection rejected"

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}


// get connection status(used by ProfileActions.jsx)
async function getConnectionStatus(req, res) {

  try {

    const currentUserId =
      req.user.id;

    const otherUserId =
      req.params.userId;



    // CHECK BLOCK FIRST
    const blocked =
      await Block.findOne({

        $or: [

          {
            blocker: currentUserId,
            blocked: otherUserId
          },

          {
            blocker: otherUserId,
            blocked: currentUserId
          }

        ]

      });


    if (blocked) {

      return res.json({

        status: "blocked"

      });

    }




    const connection =
      await Connection.findOne({

        $or: [

          {

            senderId: currentUserId,
            receiverId: otherUserId

          },

          {

            senderId: otherUserId,
            receiverId: currentUserId

          }

        ]

      });



    if (!connection) {

      return res.json({

        status: "none"

      });

    }



    if (connection.status === "accepted") {

      return res.json({

        status: "connected"

      });

    }



    if (connection.status === "pending") {

      return res.json({

        status: "pending",

        incoming:
          String(connection.receiverId)
          === currentUserId,

        connectionId:
          connection._id

      });

    }

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error"

    });

  }

}

// get my connectionSchema
async function getMyConnections(req, res) {

  try {

    const userId = req.user.id;

    const connections =
      await Connection.find({

        $or: [

          {
            senderId: userId,
            status: "accepted"
          },

          {
            receiverId: userId,
            status: "accepted"
          }

        ]

      })

        .populate(
          "senderId",
          "name role profileImage"
        )

        .populate(
          "receiverId",
          "name role profileImage"
        );

    res.json(connections);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}

// get pending requests
async function getPendingRequests(req, res) {

  try {

    const userId = req.user.id;

    const requests =
      await Connection.find({

        receiverId: userId,
        status: "pending"

      })

        .populate(
          "senderId",
          "name email role profileImage"
        );

    res.json(requests);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

}

async function removeConnection(req, res) {

  try {

    const userId = req.user.id;

    const otherUserId =
      req.params.userId;

    const deletedConnection =
      await Connection.findOneAndDelete({

        status: "accepted",

        $or: [

          {

            senderId: userId,

            receiverId: otherUserId

          },

          {

            senderId: otherUserId,

            receiverId: userId

          }

        ]

      });


    if (!deletedConnection) {

      return res.status(404).json({

        message:
          "Connection not found"

      });

    }


    res.json({

      message:
        "Connection removed"

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server error"

    });

  }

}

// block user
async function blockUser(req, res) {

  const currentUserId =
    req.user.id;

  const blockedUserId =
    req.params.userId;

  await User.findByIdAndUpdate(

    currentUserId,

    {
      $addToSet: {
        blockedUsers:
          blockedUserId
      }
    }

  );

  res.json({
    message: "User blocked"
  });

}

async function unblockUser(req, res) {

  const currentUserId =
    req.user.id;

  const blockedUserId =
    req.params.userId;

  await User.findByIdAndUpdate(

    currentUserId,

    {
      $pull: {
        blockedUsers:
          blockedUserId
      }
    }

  );

  res.json({
    message: "User unblocked"
  });

}


async function getBlockedUsers(req, res) {

  const user =
    await User.findById(
      req.user.id
    )

      .populate(
        "blockedUsers",
        "name role profileImage"
      );

  res.json(
    user.blockedUsers
  );

}

async function cancelRequest(req, res) {

  try {

    await Connection.findOneAndDelete({

      senderId: req.user.id,

      receiverId: req.params.userId,

      status: "pending"

    });

    res.json({

      message: "Request cancelled"

    });

  }

  catch (err) {

    console.log(err);

  }

}

async function getSentRequests(req, res) {

  try {

    const userId = req.user.id;

    const requests =
      await Connection.find({

        senderId: userId,
        status: "pending"

      })

        .populate(

          "receiverId",

          "name role profileImage"

        );

    res.json(requests);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error"

    });

  }

}

// get connections count

async function getConnectionsCount(req, res) {

  try {

    const userId =
      req.params.userId;

    const count =
      await Connection.countDocuments({

        status: "accepted",

        $or: [

          {
            senderId: userId
          },

          {
            receiverId: userId
          }

        ]

      });

    res.json({

      count

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error"

    });

  }

}


module.exports = {
  connectionController,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getConnectionStatus,
  getMyConnections,
  getPendingRequests,
  removeConnection,
  blockUser,
  unblockUser,
  getBlockedUsers,
  cancelRequest,
  getSentRequests,
  getConnectionsCount
};