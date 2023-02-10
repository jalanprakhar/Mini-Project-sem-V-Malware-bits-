const express = require("express");
const { putBlog } = require("../controllers/blogs.js");
const blogRouter = new express.Router();
const blogController = require("../controllers/blogs.js");

blogRouter.get("/", blogController.getAllblogs);

blogRouter.get("/userBlog", blogController.getUserBlog);
blogRouter.get("/sortedblogs", blogController.getAllblogsSorted);
blogRouter.get("/deleteblog", blogController.deleteBlog);
blogRouter.put("/", putBlog);

module.exports = blogRouter;
