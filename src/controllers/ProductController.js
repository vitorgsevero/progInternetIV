const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res, next) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });
        next(); // it will call the next middleware
        return res.json(products);

    },

    async getById(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            return res.json(product);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
            next();
        }

    },

    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.json(product);
        } catch (error) {
            let errorMsg = " was not created!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },

    async deleteOne(req, res) {
        try {
            const product = await Product.findByIdAndRemove(req.params.id);
            res.json(product + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    },

    async updateOne(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(product + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.status(404).json(req.params.id + errorMsg);
        }
    }

}