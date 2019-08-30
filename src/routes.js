const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');


//First route
routes.get("/products", ProductController.index);

routes.get("/products/:id", ProductController.getById);

routes.post("/products", ProductController.post);

routes.delete("/products/deleteOne/:id", ProductController.deleteOne);

routes.put("/products/updateOne/:id", ProductController.updateOne);

module.exports = routes;