const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Starting App
const app = express();

//Starting DB
mongoose.connect("mongodb://localhost:27017/ppi4-node", {useNewUrlParser: true});

requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});