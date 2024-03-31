const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config({ path: "/vars/.env" });

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      //   service: "gmail",
      //   port: 587,
      //   secure: false,
      //   requireTLS: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "For resetting password.",
      html:
        "<p>Hii" +
        name +
        ',please copy the link and <a href="http://localhost:8000/users/resetpassword?token=' +
        token +
        '">reset your password.</a></p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:", info.response);
      }
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const forget_password = async (req, res) => {
  const Users = mongoose.model("users");
  try {
    const email = req.body.email;
    const userData = await Users.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await Users.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res.status(200).json({
        success: "true",
        message: "Please check your inbox to reset the password.",
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "This email does not exists.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

module.exports = forget_password;
