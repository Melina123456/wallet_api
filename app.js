const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/expense/expense.routes");
require("dotenv").config({ path: "./vars/.env" });

app = express();

app.use(express.json());

//models
require("./models/users.model");

require("./models/transactions.model");

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("MongoDB connected succesfully");
  })
  .catch((e) => {
    console.log("MongoDB connection failed.", e);
  });

//routes...

app.use("/users", userRouter);

app.use("/income", incomeRouter);

app.use("/expense", expenseRouter);

app.listen(8000, () => {
  console.log("Server started successfully");
});
