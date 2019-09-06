const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const users = await User.paginate({}, { page, limit: 10 });
        return res.json(users);

    },

    async getById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }

    },

    async getByUsername(req, res){ 
        try {
            const usernameParams = req.params.username;
            const user = await User.findOne({"username": new RegExp(usernameParams, 'i')});
            return res.status(200).json(user);
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
    },

    async create(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).json(user + "created succesfully!");
        } catch (error) {
            let errorMsg = " was not created!";
            res.json(req.params.id + errorMsg);
        }
    },

    async deleteOne(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.json(user.username + " was deleted succesfully!");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
    },

    async updateOne(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(req.body.username + " was updated succesfully");
        } catch (error) {
            let errorMsg = " does not exist!";
            res.json(req.params.id + errorMsg);
        }
    }

}