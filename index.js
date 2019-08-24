const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Starting App
const app = express();

//Starting DB
mongoose.connect("mongodb://localhost:27017/ppi4-node", {useNewUrlParser: true});

requireDir('./src/models');

const Product = mongoose.model('Product');


//First route
app.get("/", (req, res) => {
  Product.create({
    title: "React Native",
    description: "Build native apps with React",
    url: "http://github.com/facebook/react-native"
  })
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});