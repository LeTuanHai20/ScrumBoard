const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: 'This field is required.'
    },
    FullName: {
        type: String,
        required: 'This field is required.'
    },
    Email: {
        type: String,
        required: 'This field is required.'
    },
    Password:{
        type:String,
        required: 'This field is required.'
    }
});
mongoose.model('User', UserSchema);