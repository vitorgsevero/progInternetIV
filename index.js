const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//Starting App
const app = express();

//To send data by JSON format
app.use(express.json());

//Grant to access the API publicly
app.use(cors());

//Starting DB
mongoose.connect("mongodb://localhost:27017/ppi4-node", {useNewUrlParser: true});

requireDir('./src/models');


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