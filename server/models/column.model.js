const mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: 'This field is required.'
    },
    Name: {
        type: String,
        required: 'This field is required.'
    },
    UserId:{
        type: String,
        required: 'This field is required.'
    }
});
mongoose.model('Column', ColumnSchema);