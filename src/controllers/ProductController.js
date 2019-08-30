const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        
        const products = await Product.find();
        return res.json(products);

    },

    async getById(req, res){
        try {
            const products = await Product.findById(req.params.id);
            return res.json(products);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
       
    },

    async post(req, res){
        Product.create({
            title: "React Native",
            description: "Build native apps with React",
            url: "http://github.com/facebook/react-native"
        });

        const products = await Product.find();
        return res.json(products);
    },

    async deleteOne(req, res){
        try {
          const product = await Product.findById(req.params.id);
          Product.collection.findOneAndDelete(product);
          res.json(product + " was deleted succesfully!");
        } catch (error) {
          let errorMsg = " does not exist!";
          res.json(req.params.id + errorMsg);
        }
       
    },

    async updateOne(req, res){
        try {
            const product = await Product.findById(req.params.id);
            Product.collection.findOneAndUpdate(product);
            res.json(product + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
    }

}