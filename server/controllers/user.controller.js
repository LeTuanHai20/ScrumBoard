const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const shortid = require('shortid');
router.post('/register', (req, res) => {
  let user = req.body;
  insertRecord(req ,res, user.name, user.email, user.password)
})
router.post('/login', (req, res) => { 
  User.find((err,docs) => {
    let user = docs.filter((user) => {
        return user.Email === req.body.email && user.Password === req.body.password;
     })
     if(user.length > 0){
       if(res.cookie.userId)
       {
          res.end('{"success" : "Updated Successfully", "status" : 200}');
       }
       else
       {
          res.cookie("userId", user[0].Id)
          res.end('{"success" : "Updated Successfully", "status" : 200}');
       }
     }else{
       res.end();
     }
  })
})
insertRecord = (req, res, name, email, password) => {  
    let user = new User();
    user.Id = shortid.generate();
    user.FullName = name;
    user.Email = email;
    user.Password = password;
    user.save((err, doc) => {
        if(!err){
          res.end('{"success" : "Updated Successfully", "status" : 200}');
        }else{
          console.log("error1")
          res.end();
        }
    })
  }
module.exports = router;