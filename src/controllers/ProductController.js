const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, {page, limit: 10});
        return res.json(products);

    },

    async getById(req, res){
        try {
            const product = await Product.findById(req.params.id);
            return res.json(product);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
       
    },

    async create(req, res){
        const product = await Product.create(req.body);
        return res.json(product);
    },

    async deleteOne(req, res){
        try {
          const product = await Product.findByIdAndRemove(req.params.id);
          res.json(product + " was deleted succesfully!");
        } catch (error) {
          let errorMsg = " does not exist!";
          res.json(req.params.id + errorMsg);
        }   
    },

    async updateOne(req, res){
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(product + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
    }

}