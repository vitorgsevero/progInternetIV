const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);