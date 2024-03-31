const mongoose = require("mongoose");
const twilio = require("twilio");
const OTP = require("../../../models/otp.model");

require("dotenv").config({ path: "/vars/.env" });

const userRegister = async (req, res) => {
  const users = mongoose.model("users");

  // Validation

  // Object created

  const { phoneNumber } = req.body;

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP to MongoDB
  try {
    await OTP.create({
      phoneNumber,
      otp,
      isUsed: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save OTP." });
    return;
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  const client = new twilio(accountSid, authToken);

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: phoneNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP." });
    return;
  }

  res.status(200).json({
    message: "OTP sent successfully!",
    phoneNumber: phoneNumber,
  });
};

module.exports = userRegister;
