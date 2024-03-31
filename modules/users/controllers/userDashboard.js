const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transactions");

  const getTransaction = await Transaction.find({
    user_id: req.user._id,
  })
    .sort("-createdAt")
    .select("amount remarks transaction_type")
    .limit(5);

  const getUserData = await User.findOne({
    _id: req.user._id,
  }).select("balance name");
  res.status(200).json({
    data: getUserData,
    transaction: getTransaction,
  });
};
module.exports = userDashboard;
