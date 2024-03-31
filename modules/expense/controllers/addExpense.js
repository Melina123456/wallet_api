const mongoose = require("mongoose");

const addExpense = async (req, res) => {
  const { amount, remarks } = req.body;
  const Users = mongoose.model("users");
  const Transaction = mongoose.model("transactions");

  //validation

  try {
    if (!amount) throw "Please enter the amount.";

    if (amount < 0) throw "Please enter the valid amount.";

    if (!remarks) throw "Please enter the remarks";

    if (remarks.length < 2) throw "The remarks must be at least 2 characters.";
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    return;
  }

  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "expense",
    });

    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
    return;
  }

  res.status(200).json({
    message: "The expense was added.",
    expense: amount,
  });
};
module.exports = addExpense;
