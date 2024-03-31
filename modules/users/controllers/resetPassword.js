const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const Users = mongoose.model("users");
  try {
    const token = req.query.token;
    const tokenData = await Users.findOne({ token: token });
    if (tokenData) {
      const password = req.body.password;
      const newPassword = await bcrypt.hash(password, 10);
      const userData = await Users.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res.status(200).json({
        success: "true",
        message: "User password has been reset.",
        data: userData,
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "This link has been expired.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

module.exports = resetPassword;
