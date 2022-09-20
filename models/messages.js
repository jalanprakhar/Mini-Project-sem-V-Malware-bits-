const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  timestamp: Date,
  from_userId: String,
  to_userId: String,
  message_data: String,
});

module.exports = mongoose.model("Message", messageSchema);
