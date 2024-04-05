var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
// CREATE
router.get('/create', async function(req, res) {
  const createduser = await userModel.create({
    username: "soumita",
    age: 21,
    name: 'Soumita Banerjee',
  });
  res.send(createduser);
});
// FIND
router.get("/alluser", async function(req, res){
  let allusers = await userModel.findOne({username: "soumita"});
  res.send(allusers)
})
// DELETE
router.get("/delete", async  function (req,res) {
  let deletedusers = await userModel.findOneAndDelete({name:"Soumita Banerjee"});
  res.send(deletedusers)
})


// create session
router.get('/', function(req, res, next) {
  req.session.age = 12;
  res.render('index');
});
// read session
router.get("/checkage", function(req, res){
  if(req.session.age === 12){
    res.send("you are banned")
  }
  else{
    res.send("not banned")
  }
})
// delete session
router.get("/removeage", function(req, res){
    req.session.destroy(function(err){
      if (err) throw err;
    })
    res.send("ban removed")
})


// create cookie
router.get("/", function(req,res){
  res.cookie("age", 21)
  res.render("index")
});
// read  cookies
router.get("/read", function(req, res){
  console.log(req.cookies);
  res.send("check")
})
// delete cookie
router.get("/deletecookie", function(req, res){
  res.clearCookie("age");
  res.send("clear ho gayi")
})


module.exports = router;
