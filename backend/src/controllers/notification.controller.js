const Notification = require("../models/notification.model");

async function getNotifications(
  req,
  res
) {

  try {

    const notifications =

      await Notification.find({

        receiver:
          req.user.id

      })

        .populate(
          "sender",
          "name profileImage role"
        )

        .sort({
          createdAt: -1
        });


    res.json(
      notifications
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



async function markAsRead(
  req,
  res
) {

  try {

    await Notification.findByIdAndUpdate(

      req.params.id,

      {
        read: true
      }

    );

    res.json({

      message:
        "updated"

    });

  }

  catch (err) {

    console.log(err);

  }

}


module.exports = { getNotifications, markAsRead };