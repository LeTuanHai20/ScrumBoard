const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Column = mongoose.model('Column');
const shortid = require('shortid');
const { route } = require('./user.controller');
router.post('/Column', function (req, res) {
    let column = req.body;
    insertColumn(req,res,column.Name, req.cookies.userId);
})
router.post("/deleteColumn", function (req, res) {
        Column.findOneAndDelete(req.body.ColumnId, function (err,doc) {
            if(!err)
            {
              res.end('{"success" : "Updated Successfully", "status" : 200}');
            }
            else{
              res.end();
            }
        });
})
router.get("/Column", function (req, res) {
  Column.find((err,docs) => {
     let data = docs.filter((item) => {
       return item.UserId == req.cookies.userId;
     })
       res.json(data);
  })
})
insertColumn = (req, res, name, userId) => {  
    let column = new Column();
    Column.find((err,docs) => {
      if(docs.length > 4)
      {
        res.end();
      }
    });
    column.Id = shortid.generate();
    column.Name = name;
    column.UserId = userId;
    column.save((err, doc) => {
        if(!err)
        {
          res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
        else
        {
          res.end();
        }
    })
  }
module.exports = router;