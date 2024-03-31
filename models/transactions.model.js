const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "amount is required."],
    },
    remarks: {
      type: String,
      required: [true, "remarks is required."],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user_id is required."],
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required."],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("transactions", transactionSchema);
module.exports = userModel;
