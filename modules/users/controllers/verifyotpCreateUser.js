const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const OTP = require("../../../models/otp.model");

const verifyOTPAndCreateUser = async (req, res) => {
  const users = mongoose.model("users");

  const { phoneNumber, enteredOTP, name, email, password, address, balance } =
    req.body;
  if (!enteredOTP) {
    return res.status(400).json({ error: "Please enter the OTP." });
  }

  let storedOTP;
  let isOTPUsed;
  try {
    const otpDoc = await OTP.findOne({ phoneNumber });
    console.log("Identifier:", phoneNumber);
    if (!otpDoc) {
      return res.status(400).json({ error: "failed to retrieve OTP." });
    }
    storedOTP = otpDoc.otp;
    isOTPUsed = otpDoc.isUsed;

    if (isOTPUsed) {
      return res.status(400).json({ error: "The OTP has been already used." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve OTP." });
  }

  if (enteredOTP === storedOTP) {
    const encPass = await bcrypt.hash(password, 10);

    try {
      const createdUser = await users.create({
        name,
        email,
        password: encPass,
        address,
        phoneNumber,
        balance,
      });

      // Mark the OTP document as used
      await OTP.findOneAndUpdate({ phoneNumber }, { $set: { isUsed: true } });

      res.status(200).json({
        message: "User registered successfully!",
        user: createdUser,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  } else {
    res.status(400).json({ error: "Invalid OTP. Please try again." });
  }
};

module.exports = verifyOTPAndCreateUser;
