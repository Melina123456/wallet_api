const express = require("express");
const addExpense = require("./controllers/addExpense");
const auth = require("../../middleware/auth");

const expenseRouter = express.Router();

expenseRouter.use(auth);

expenseRouter.use("/add", addExpense);

module.exports = expenseRouter;
