const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const shortid = require('shortid');
router.post('/Task', function (req, res) {
   let task = req.body; 
   insertTask(req, res,task.ColumnId, task.Name, task.Content)
})
router.get('/Task', function (req, res) {
    Task.find((err,docs) => {
      let result = docs.filter((task) => task.UserId == req.cookies.userId);
      res.json(result); 
    })
})
insertTask = (req, res, columnId, name, content) => {
   
      let taskId = shortid.generate()
      let task = new Task();
      task.Id = taskId;
      task.Name = name;
      task.Content = content;
      task.ColumnId  = columnId;
      task.UserId = req.cookies.userId;
      task.save((err, doc) => {
          if(!err){
            res.end('{"success" : "Updated Successfully", "status" : 200}');
          }else{
            return res.status(400).json({ error: 2});
          }
      })
    }
  module.exports = router;