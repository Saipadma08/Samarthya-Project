const jwt = require("jsonwebtoken");

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