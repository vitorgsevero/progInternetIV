const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {

    async login(req, res){
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email}).select('+password');

            if(!user) return res.status(400).send({error: 'E-mail not found'});

            // if(!user.password === password) return res.status(400).send({error: 'Invalid password'});
            if(!await bcrypt.compare(password, user.password)) return res.status(400).send({error: 'Invalid password'});

            // user.password = undefined;

            const token = jwt.sign({ id: user.id}, authConfig.secret,{
                expiresIn: 86400,
            });

            res.send({user, token});

        } catch (error) {
            
        }
    }

}