const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String, 
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);