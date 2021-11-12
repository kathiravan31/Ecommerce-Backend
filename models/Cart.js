const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'userId is required'],
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'productId is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'quantity is required']
        },
        amount: {
            type: String,
            required: [true, 'amount is required']
        },
        status: {
            type: String,
            default: 'cart'
        }
    },
    {timestamps: true}
)

CartSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cart',CartSchema);