const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

username:{
  type:String,
  required:true,
  unique:true
},
  name: String,
  email: String,
  show_email: {
    type: Boolean,
    default: false,
  },

  likes: {
    type: Number,
    default: 0,
  },
  searchHistory:[
    {
      searchQuery: String,
      trainingAcc:String,
      testAcc:String,
      fileTestClfRep:String,
      fileTestConfMat:String,
      fileTrainClfRep:String,
      fileTrainConfMat:String
    }
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },

  show_gender: {
    type: Boolean,
    default: false,
  },
  blogs: { type: [String], default: [] },
  ieee_id: { type: String, default: "" },
  password: String,
  img_url: {
    type: String,
    default:
      "https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=gkvLDCgsHH-8HeQe7JsjhlOY6vRBJk_sKW9lyaLgmLo=",
  },
  professional_title: String,
  years_of_experience: Number,
  dob_day: Number,
  dob_month: Number,
  dob_year: Number,
  gender: String,
  about: String,
  // TODO
  // Areas_of_expertise: [String],

  github_username: {
    type: String,
    default: "",
  },
  profile_completed: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: [String],
    default: [],
  },
  matches: {
    type: [String],
    default: [],
  },
  block: {
    type: [String],
    default: [],
  },
  pendingRequests: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
