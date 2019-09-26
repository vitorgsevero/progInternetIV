const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const OrderSchema = mongoose.Schema({
    qty: {
        type: Number,
        required: true,
    },
    items: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: this.qty * this.price,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

OrderSchema.plugin(mongoosePaginate);

mongoose.model('Order', OrderSchema);