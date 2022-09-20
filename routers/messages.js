const express = require("express");
const messageRouter = new express.Router();
const messageController = require("../controllers/messages.js");

messageRouter.get("/", messageController.getAllMessages);

messageRouter.put("/", messageController.postMessage);

module.exports = messageRouter;
