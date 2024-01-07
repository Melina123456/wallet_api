const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

app = express();

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("MongoDB connected succesfully");
  })
  .catch((e) => {
    console.log("MongoDB connection failed.", e);
  });

app.listen(8000, () => {
  console.log("Server started successfully");
});
