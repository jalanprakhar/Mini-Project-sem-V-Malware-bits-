const express = require("express");
const authRouter = new express.Router();
const authController = require("../controllers/auth.js");

authRouter.post("/login", authController.login);

authRouter.post("/signup", authController.signup);

module.exports = authRouter;
