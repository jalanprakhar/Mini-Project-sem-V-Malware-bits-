require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://pujasaraf:miniproject123@cluster0.bl3mpow.mongodb.net/test`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
