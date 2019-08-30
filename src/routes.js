const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');


//First route
routes.get("/products", ProductController.index);

routes.post("/products", ProductController.save);

routes.delete("/products/deleteOne/:id", ProductController.deleteOne);

module.exports = routes;