const mongoose = require('mongoose');

const Order = mongoose.model('Order');

module.exports = {
    async getAllOrders(req, res, next) {
        const { page = 1 } = req.query;
        const orders = await Order.paginate({}, { page, limit: 10 });
        next(); // it will call the next middleware
        return res.json(orders);

    },

    async getOrderById(req, res, next) {
        try {
            const order = await Order.findById(req.params.id);
            return res.json(order);
        } catch (error) {
            let errorMsg = " Order ID does not exist!";
            res.status(404).json(req.params.id + errorMsg);
            next();
        }

    },

    async buy(req, res) {
        try {
            const order = await Order.create(req.body);
            console.log(order);
            return res.json(order);
        } catch (error) {
            let errorMsg = " was not created!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },

    async deleteOrder(req, res) {
        try {
            const order = await Order.findByIdAndRemove(req.params.id);
            res.json(order + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " Order ID does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },

    async updateOrder(req, res) {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(order + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    }

}