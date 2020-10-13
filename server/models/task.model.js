const mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: 'This field is required.'
    },
    Name: {
        type: String,
        required: 'This field is required.'
    },
    Content:{
        type:String
    },
    ColumnId:{
        type: String,
        required: 'This field is required.'
    },
    UserId:{
        type: String,
        required: 'This field is required.'
    }
});
mongoose.model('Task', TaskSchema);