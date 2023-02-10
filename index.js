const express = require("express");
const cors = require("cors");
const fs = require('fs');
const fse = require('fs-extra');
const {spawn} = require('child_process');
require("./db/connection.js");
const authRouter = require("./routers/auth.js");
const messageRouter = require("./routers/messages.js");
const userRouter = require("./routers/users.js");
const blogRouter = require("./routers/blogs.js");
const app = express();

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.static(__dirname + '/uploads'));
app.use("/auth", authRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.post('/xyz', async(req, res) => {
  console.log("hello")
  const { runstr } = req.body;
  // const userid=req.user._id;/
  // const founduser = await User.findById(userid);
  try{var dataToSend;
      var args= ['main.py'];
      var arr = runstr.split(" ");
      arg=args.concat(arr);
      let namefile="userid"+"-"+Date.now().toString();
  
      const obj={};
      obj['searchQuery']=runstr;
      // console.log(args);
      // res.send("hello");
      // ['main.py','bnr', 'lgr', 'saga', 'l1', '3']
      const python = spawn('python', arg);
      // console.log(arg)
      python.stdout.on('data', function (data) {
       console.log('Pipe data from python script ...');
       dataToSend = data.toString();
      });
      python.on('close', async(code) => {
        var arr1 = dataToSend?.split(" ");
        console.log(`child process close all stdio with code ${code}`);
        let src1 = "test_clf_rep.png";
        let dest1 = `uploads/${namefile}_test_clf_rep.png`;
        fse.move(src1, dest1, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src2 = "test_conf_mat.png";
        let dest2 = `uploads/${namefile}_test_conf_mat.png`;
        fse.move(src2, dest2, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src3 = "training_clf_rep.png";
        let dest3 = `uploads/${namefile}_training_clf_rep.png`;
        fse.move(src3, dest3, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src4 = "training_conf_mat.png";
        let dest4 = `uploads/${namefile}_training_conf_mat.png`;
        fse.move(src4, dest4, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        obj['trainingAcc']=arr1[0];
        obj['testAcc']=arr1[1];
        obj['fileTestConfMat']= `http://localhost:8000/${namefile}_test_conf_mat.png`;
        obj['fileTestClfRep']= `http://localhost:8000/${namefile}_test_clf_rep.png`;        
        obj['fileTrainConfMat']= `http://localhost:8000/${namefile}_training_conf_mat.png`;
        obj['fileTrainClfRep']= `http://localhost:8000/${namefile}_training_clf_rep.png`;
        // founduser.searchHistory.push(obj);
        // await founduser.save();
        res.send(obj);
      });
  }
 catch (error) {
  res.status(500).json({ message: "No args posted" });
  console.log(error); 
}
  
}); 
app.get("/", (req, res) => {
  res.send("Malware bits is running!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
