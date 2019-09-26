const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  crypto = require('crypto');
const mailer = require('../resources/mail/auth/mailer');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {

    async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                email
            });

            if (!user) return res.status(400).send({
                error: 'Invalid e-mail!'
            });

            if (!await bcrypt.compare(password, user.password)) return res.status(400).send({
                error: 'Invalid password!'
            });

            res.send({
                user,
                token: generateToken({
                    id: user.id
                }),
            });

        } catch (error) {
            console.log(error)
            res.status(401).send({
                error: 'Something went wrong, invalid credentials'
            })
        }
    },

    async tokenValidation(req, res, next) {
        try {
            const token = req.get("Authorization");
            console.log(token);
            jwt.verify(token, authConfig.secret, (err, decoded) => {
                if (err) return res.status(401).send({error: 'Invalid Token'});

                if(!err) return res.status(200).send({ok: 'Valid Token'});
                req.userId = decoded.id;
                console.log("Valid Token: " + userId);
                return next();
            })
        } catch (err) {
            res.status(401).send(err);
        }
    },

    async forgotPassword(req, res, next){
        const { email } = req.body;

        try {
            const user = await User.findOne({email});

            if(!user){
                return res.status(400).send({error: 'User not found'});
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();

            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token, 
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: 'vitorgsevero@gmail.com',
                template: 'email/forgot_password',
                context: { token },
            }, (err) => {
                if (err){ 
                console.log(err)
                return res.status(400).send({error: 'Error in forgot password, please try again'});
                }

                return res.send();
            })

            console.log(token, now);


        } catch (error) {
            res.status(400).send({error: 'Error on forgot password, try again!'})
        }
    }


}