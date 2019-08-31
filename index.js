const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//Starting App
const app = express();

//To send data by JSON format
app.use(express.json());

//Grant to acess the API publicly
app.use(cors());

//Starting DB
mongoose.connect("mongodb://localhost:27017/ppi4-node", {useNewUrlParser: true});

requireDir('./src/models');

//Routes
app.use('/api', require('./src/routes'));

app.listen(3000, function () {
  console.log('PPI4 Project app listening on port 3000!');
});