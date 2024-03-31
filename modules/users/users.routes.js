const express = require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forget_password = require("./controllers/forgetPassword");
const resetPassword = require("./controllers/resetPassword");
const verifyOTPAndCreateUser = require("./controllers/verifyotpCreateUser");
const hello = require("./controllers/hello");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/verify", verifyOTPAndCreateUser);
userRouter.post("/login", userLogin);
userRouter.post("/forgetpassword", forget_password);
userRouter.get("/resetpassword", resetPassword);
userRouter.get("/hello", hello);

//protected route...
userRouter.use(auth);

userRouter.get("/dashboard", userDashboard);

//to reset password

module.exports = userRouter;
