const dotenvsafe = require("dotenv-safe");
var jwt = require('jsonwebtoken');

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

//Starting App
const app = express();

//To send data by JSON format
app.use(express.json());

//Grant to access the API publicly
app.use(cors());

//Starting DB
mongoose.connect("mongodb://localhost:27017/ppi4-node", {useNewUrlParser: true});

requireDir('./src/models');

//Log File
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

// Middleware loggedAt
var loggedAt = function (req, res, next) {
  requestTime = req.requestTime = new Date().toDateString(); 
  console.log("Request Date: " + requestTime);
  next();
};

app.use(loggedAt);


//Routes
app.use('/api', require('./src/routes'));

app.listen(3000, function () {
  console.log('PPI4 Project app listening on port 3000!');
});