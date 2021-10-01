const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.authenticateJWT = (req, res, next) => {
  let token = req.headers.authorization;
  // console.log("req.headers: ", req.headers);
  // console.log("token: ", token);
  if (!token) {
    return res.status(401).json({
      errorMessage: "Authentication denied",
    });
  }

  try {
    token = token.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWTSECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log("jwt error", error);
    res.status(401).json({
      errorMessage: "Invalid token",
    });
  }
};
