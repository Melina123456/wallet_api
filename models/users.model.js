const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password  is required."],
    },

    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Use a regular expression to check if the phone number is in the format +977XXXXXXXXX
          return /^\+977\d{10}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid phone number in the format +977XXXXXXXXX`,
      },
      required: true,
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
