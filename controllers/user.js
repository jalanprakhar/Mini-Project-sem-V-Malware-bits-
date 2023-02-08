const User = require("../models/user.js");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const { username } = req.query;
      const curUser = await User.findOne({ username });
      const blocked_users = curUser.block;
      const matched_users = curUser.matches;
      
      const rejected_users = curUser.rejected;
      const query = {
        $and: [
          {
            username: {
              $ne: username,
            },
          },
          {
            profile_completed: true,
          },
          {
            email_verified: true,
          },
          {
            password: {
              $exists: true,
            },
          },
          {
            username: {
              $nin: blocked_users,
            },
          },

          {
            username: {
              $nin: matched_users,
            },
          },
          {
            username: {
              $nin: rejected_users,
            },
          },
        ],
      };
      const users = await User.find(query).sort({ github_verified: -1 });

      res.status(200).send(users);
    } catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const { username, requested_id } = req.query;

      const curUser = await User.findOne({ username });
      const blocked_users = curUser.block;
      const query = {
        $and: [
          {
            username: requested_id,
          },
        ],
      };
      const user = await User.findOne(query);
      if (user) {
        return res.status(200).send(user);
      } else {
        res.status(403).send("blocked");
      }
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  },
  updateUser: async (req, res) => {
    const formData = req.body.formData;
    try {
      const query = { username: formData.username };
      const updateDocument = {
        $set: {
          name: formData.name,
          dob_day: formData.dob_day,
          dob_month: formData.dob_month,
          dob_year: formData.dob_year,
          gender: formData.gender,
          img_url:
            formData.img_url.length > 0
              ? formData.img_url
              : "https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=gkvLDCgsHH-8HeQe7JsjhlOY6vRBJk_sKW9lyaLgmLo=",
          about: formData.about,
          professional_title: formData.professional_title,
          years_of_experience: formData.years_of_experience,
          show_email: formData.show_email,
          github_username: formData.github_username,
          show_gender: formData.show_gender,
          ieee_id: formData.ieee_id,
          profile_completed: true,
        },
      };

      await User.updateOne(query, updateDocument);
      const updatedUser = await User.findOne({ username: formData.username });

      res.status(201).send(updatedUser);
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  },
  getAllUsersSorted: async (req, res) => {
    try {
      const query = {
        $and: [
          {
            profile_completed: true,
          },
          {
            password: {
              $exists: true,
            },
          },
        ],
      };
      const users = await User.find(query).sort({ likes: -1 }).limit(5);

      res.status(200).send(users);
    } catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
  },
  getRejectedUsers: async (req, res) => {
    const { username } = req.query;
    const curUser = await User.findOne({ username });
    const blocked_users = curUser.block;
    const rejected_users = curUser.rejected;
    const query = {
      $and: [
        {
          username: {
            $ne: username,
          },
        },
        {
          email_verified: true,
        },
        {
          password: {
            $exists: true,
          },
        },
        {
          username: {
            $nin: blocked_users,
          },
        },

        {
          username: {
            $in: rejected_users,
          },
        },
      ],
    };
    try {
      const users = await User.find(query);
      res.status(200).send(users);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  },
  getMatchedUsers: async (req, res) => {
    const { username } = req.query;
    const curUser = await User.findOne({ username });
    const matched_users = curUser.matches;
    const blocked_users = curUser.block;
    const rejected_users = curUser.rejected;
    const query = {
      $and: [
        {
          username: {
            $ne: username,
          },
        },
        {
          email_verified: true,
        },
        {
          password: {
            $exists: true,
          },
        },
        {
          username: {
            $nin: blocked_users,
          },
        },
        {
          username: {
            $nin: rejected_users,
          },
        },
        {
          username: {
            $in: matched_users,
          },
        },
      ],
    };
    try {
      const users = await User.find(query);
      res.status(200).send(users);
    } catch (e) {
      console.log(e.message);
      res.status(404).send(e.message);
    }
  },

  getPendingUsers: async (req, res) => {
    const { username } = req.query;
    const curUser = await User.findOne({ username });
    const pending_users = curUser.pendingRequests;
    const blocked_users = curUser.block;
    const rejected_users = curUser.rejected;
    const query = {
      $and: [
        {
          username: {
            $ne: username,
          },
        },
        {
          email_verified: true,
        },
        {
          password: {
            $exists: true,
          },
        },
        {
          username: {
            $nin: blocked_users,
          },
        },
        {
          username: {
            $nin: rejected_users,
          },
        },
        {
          username: {
            $in: pending_users,
          },
        },
      ],
    };
    try {
      const users = await User.find(query);
      res.status(200).send(users);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  },

  rejectUser: async (req, res) => {
    const { username, clicked_username } = req.query;
    try {
      const req_user = await User.findOne({ username: clicked_username });
      const query = {
        $and: [
          {
            username: clicked_username,
          },
          {
            username: {
              $in: req_user.pendingRequests,
            },
          },
        ],
      };
      const that_user = User.findOne(query);
      if (that_user) {
        await User.updateOne(
          { username: clicked_username },
          {
            $pull: {
              pendingRequests: username,
            },
          }
        );
      }
      await User.updateOne(
        { username },
        {
          $push: {
            rejected: clicked_username,
          },
        }
      );
      const user = await User.findOne({ username });
      res.status(201).send(user);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  },

  unrejectUser: async (req, res) => {
    const { username, clicked_username } = req.query;
    try {
      await User.updateOne(
        { username },
        {
          $pull: {
            rejected: clicked_username,
          },
        }
      );
      const user = await User.findOne({ username });
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  postMatchUser: async (req, res) => {
    const { username, clicked_username } = req.query;
    try {
      const query = {
        $and: [
          {
            username,
          },
          {
            pendingRequests: {
              $in: clicked_username,
            },
          },
        ],
      };
      const user = await User.findOne(query);
      // console.log(user);
      if (user === null) {
        await User.updateOne(
          { username },
          {
            $push: {
              matches: clicked_username,
            },
          }
        );
        await User.updateOne(
          { username: clicked_username },
          {
            $push: {
              pendingRequests: username,
            },
          }
        );
      } else {
        await User.updateOne(
          { username },
          {
            $pull: {
              pendingRequests: clicked_username,
            },
          }
        );
        await User.updateOne(
          { username },
          {
            $push: {
              matches: clicked_username,
            },
          }
        );
      }
      const finalUser = await User.findOne({ username });
      res.status(201).send(finalUser);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  },
};

module.exports = userController;
