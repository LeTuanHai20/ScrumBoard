const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ScrumBoard',
 { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
require('./user.model');
require('./column.model');
require('./task.model')