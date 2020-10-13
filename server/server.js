require('./models/db');
const http = require('http');
const express = require('express');
const ApiUser = require('./controllers/user.controller');
const ApiColumn = require('./controllers/column.controller');
const ApiTask = require('./controllers/task.controller')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cookieParser("adsasdaagacuu1231"));
app.use(bodyparser.json());
app.use(express.static('../frontend'));
app.use('/api', ApiUser,ApiTask,ApiColumn);
http.createServer(app).listen(8124);