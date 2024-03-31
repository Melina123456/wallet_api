const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  const { email, password } = req.body;

  //validation

  try {
    if (!email) throw "Please provide email.";
    if (!password) throw "user must enter the password.";

    const getUser = await Users.findOne({
      email: email,
    });

    if (!getUser) throw "The email is not registered.";

    const matched = await bcrypt.compare(password, getUser.password);

    if (!matched) throw "The email and password doesn't match.";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }

  const getUserForAccessToken = await Users.findOne({
    email: email,
  });

  const accessToken = await jwt.sign(
    {
      _id: getUserForAccessToken._id,
      email: getUserForAccessToken.email,
      name: getUserForAccessToken.name,
    },
    process.env.jwt_salt,
    { expiresIn: "5 years" }
  );

  //everything went fine
  res.status(200).json({
    status: "user logged in successfully.",
    accessToken,
  });
};

module.exports = userLogin;
