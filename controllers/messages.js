const Message = require("../models/messages.js");

const messageController = {
  getAllMessages: async (req, res) => {
    const { username, client_username } = req.query;
    // console.log(username, client_username);
    try {
      const query = {
        from_userId: username,
        to_userId: client_username,
      };

      const foundMessages = await Message.find(query);
      res.send(foundMessages);
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  },

  postMessage: async (req, res) => {
    const { message } = req.body;
    try {
      const insertedMessage = await Message.create(message);
      res.send(insertedMessage);
    } catch (e) {
      console.log(e.message);
    }
  },
};
module.exports = messageController;
