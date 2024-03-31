const hello = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};
module.exports = hello;
