const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authConfig = require('../config/auth');

module.exports = {

    async login(req, res){
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email});

            if(!user) return res.status(400).send({error: 'E-mail does not exist!'});

            if(!await bcrypt.compare(password, user.password)) return res.status(400).send({error: 'Invalid password!'});

            const token = jwt.sign({ id: user.id }, authConfig.secret,{
                expiresIn: 86400,
            });

            res.send({user, token});

        } catch (error) {
            
        }
    },

    async tokenVerification(req, res, next){
        // if () {
            
        // } else {
            
        // }
    }

}