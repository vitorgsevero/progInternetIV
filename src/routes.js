const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const OrderController = require('./controllers/OrderController');

//Product Routes
routes.get("/products", ProductController.index);

routes.get("/products/:id", ProductController.getById);

routes.post("/products", ProductController.create);

routes.delete("/products/:id", ProductController.deleteOne);

routes.put("/products/:id", ProductController.updateOne);


//User Routes
routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.getById);

routes.get('/users/username/:username', UserController.getByUsername);

routes.post('/users', UserController.create);

routes.delete('/users/:id', UserController.deleteOne);

routes.put('/users/:id', UserController.updateOne);


//Order Routes
routes.post('/orders', OrderController.buy);

routes.get('/orders', OrderController.getAllOrders);

routes.get('/orders/:id', OrderController.getOrderById);

routes.delete('/orders/:id', OrderController.deleteOrder);

routes.put('/orders/:id', OrderController.updateOrder);


//authentication
routes.post('/login', AuthController.login);

//Token Verification
routes.post('/users/login/token', AuthController.tokenValidation);

//Forgot Password
routes.post('/users/forgot_password', AuthController.forgotPassword);


module.exports = routes;