const jwt = require("jsonwebtoken");

const User =
  require("../models/user.model");

async function authMiddleware(
  req,
  res,
  next
) {

  try {

    let token = null;

    // cookie token
    if (req.cookies.token) {

      token =
        req.cookies.token;
    }

    // bearer token
    if (
      !token &&
      req.headers.authorization
    ) {

      const authHeader =
        req.headers.authorization;

      if (
        authHeader.startsWith(
          "Bearer "
        )
      ) {

        token =
          authHeader.split(" ")[1];
      }
    }

    if (!token) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      );


    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

    const allowDisabledAccess = [

      "/request-review"

    ].some(route =>

      req.originalUrl.includes(
        route
      )

    );


    if (

      (decoded.version ?? 0)

      !==

      (user.tokenVersion ?? 0)

    ) {

      return res.status(401)
        .json({

          message:
            "Session expired"

        });

    }


    // blocked account
    // blocked account
    if (

      user.isBlocked

      &&

      !allowDisabledAccess

    ) {

      return res.status(403).json({

        type: "blocked",

        reason: user.blockReason,

        userId: user.id,

        email: user.email,

        appealStatus:
          user.deactivationAppealStatus,

        appealRejectCount:
          user.appealRejectCount,

        rejectedAt:

          user.appealHistory?.length

            ?

            user.appealHistory[
              user.appealHistory.length - 1
            ]?.date

            :

            null,

        message:
          "Account blocked"

      });

    }

    // suspended account
    if (

      user.isSuspended &&

      user.suspensionEndsAt &&

      user.suspensionEndsAt >

      new Date()

      &&

      !allowDisabledAccess

    ) {

      return res.status(403).json({

        type: "suspended",

        reason: user.suspensionReason,

        until: user.suspensionEndsAt,

        userId: user.id,

        email: user.email,

        appealStatus:
          user.deactivationAppealStatus,

        appealRejectCount:
          user.appealRejectCount,

        rejectedAt:

          user.appealHistory?.length

            ?

            user.appealHistory[
              user.appealHistory.length - 1
            ]?.date

            :

            null,

        message:
          "Account suspended"

      });

    }


    // auto-reactivate
    if (

      user.isSuspended &&

      user.suspensionEndsAt &&

      user.suspensionEndsAt <

      new Date()

    ) {

      user.isSuspended = false;

      user.suspensionEndsAt = null;

      user.suspensionReason = null;

      await user.save();

    }


    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports =
  authMiddleware;