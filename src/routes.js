const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');


//Product Routes
routes.get("/products", ProductController.index);

routes.get("/products/:id", ProductController.getById);

routes.post("/products", ProductController.create);

routes.delete("/products/:id", ProductController.deleteOne);

routes.put("/products/:id", ProductController.updateOne);


//User Routes
routes.get("/users", UserController.index);

routes.get("/users/:id", UserController.getById);

routes.get("/users/username/:username", UserController.getByUsername);

routes.post("/users", UserController.create);

routes.delete("/users/:id", UserController.deleteOne);

routes.put("/users/:id", UserController.updateOne);

module.exports = routes;