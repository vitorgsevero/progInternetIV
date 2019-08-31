const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');


//All routes operations
routes.get("/products", ProductController.index);

routes.get("/products/:id", ProductController.getById);

routes.post("/products", ProductController.create);

routes.delete("/products/:id", ProductController.deleteOne);

routes.put("/products/:id", ProductController.updateOne);

module.exports = routes;