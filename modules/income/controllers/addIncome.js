const mongoose = require("mongoose");

const addIncome = async (req, res) => {
  const { amount, remarks } = req.body;
  const Users = mongoose.model("users");
  const Transaction = mongoose.model("transactions");

  //validation

  try {
    if (!amount) throw "Please enter the amount.";

    if (amount < 10) throw "The amount must be at least 10.";

    if (!remarks) throw "Please enter the remarks.";

    if (remarks.length < 2) throw "The remarks must be at least 2 characters.";
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
    return;
  }

  //success

  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "income",
    });

    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount,
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

  // const getUserData = await Users.findOne({
  //   _id: req.user._id,
  // }).select("balance");

  res.status(200).json({
    message: "The income was added",
    addedAmount: amount,
    // balance: getUserData,
  });
};
module.exports = addIncome;
