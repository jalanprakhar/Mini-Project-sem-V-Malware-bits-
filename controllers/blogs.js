const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const blogController = {
  getAllblogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).send(blogs);
    } catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
  },
  getUserBlog: async (req, res) => {
    try {
      const { username } = req.query;
      // console.log(username)
      const query = {
        $and: [
          {
            username: {
              $eq: username,
            },
          },
        ],
      };
      const userBlogs = await Blog.find(query);
      // console.log("hereee");
      console.log(userBlogs);
      res.status(200).send(userBlogs);
    } catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
  },
  putBlog: async (req, res) => {
    try {
      const { username } = req.query;
      // console.log("herw");
      // console.log(req.body);
      const user = await User.findOne({ username });

      const blog = req.body.blog;
      const nblog = { ...blog, name: user.name };
      const newBlog = new Blog(nblog);
      await newBlog.save();
      const curblog = user.blogs;
      curblog.push(newBlog._id);
      const updateUser = {
        $set: {
          blogs: curblog,
        },
      };
      await User.updateOne({ username }, updateUser);
      res.status(201).send(newBlog);
    } catch (e) {
      console.log(e);
      res.status(403).send(e.message);
    }
  },
  getAllblogsSorted: async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ upvotes: -1 }).limit(10);
      // console.log(blogs)
      res.status(200).send(blogs);
    } catch (e) {
      console.log(e.message);
      res.status(404).send(e.message);
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const _id = req.query;
      const blogreq = await Blog.findOne({_id})
      const userid = blogreq.username;
      const user = await User.findOne({ username:userid});
      
      const curblog = user.blogs;
      
      curblog.filter((blog)=>blog._id===_id);
      const newUser={...user,blogs:curblog};
      console.log(newUser)
      // const rr=await User.updateOne({ username:userid }, newUser);
      const blogs = await Blog.deleteOne( {_id});
      // console.log(rr);
      res.json(blogs);
    } catch (e) {
      console.log(e.message);
      res.status(404).send(e.message);
    }
  },
};
module.exports = blogController;
