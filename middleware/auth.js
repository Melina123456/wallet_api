const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //auth logic

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed !!! You must log in. ",
    });
    return;
  }
  const token = authorizationHeader.split("Bearer ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "The  token is not valid.",
    });
    return;
  }

  //check auth header

  next();
};
module.exports = auth;
