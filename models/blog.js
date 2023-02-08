const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  hashes: [String],
  content: String,
  username: String,
  name: String,
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      username: String,
      content: String,
    },
  ],
  attachments: {
    type: [
      {
        title: String,
        drive_link: String,
      },
    ],
  },
  collaborators: [String],
});

module.exports = mongoose.model("Blogs", blogSchema);
