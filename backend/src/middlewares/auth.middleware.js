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


    // blocked account
    if (user.isBlocked) {

      return res.status(403).json({

        message: "Your account is blocked"

      });

    }


    // suspended account
    if (

      user.isSuspended &&

      user.suspensionEndsAt >

      new Date()

    ) {

      return res.status(403).json({

        message:
          "Account temporarily suspended"

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