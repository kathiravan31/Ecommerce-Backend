const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {   
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'productId is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'quantity is required']
                }
            }
        ],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'userId is required']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        discount: {
            type: Number,
        },
        grandtotal: {
            type: Number,
        },
        pendingAmount: {
            type: Number
        },
        paidAmount: {
            type: Number
        },
        status: {
            type: String,  // ordered, shipping, delivered, cancel, return, paymentPending
            default: 'pending'
        }
    },
    {timestamps: true}
)

OrderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', OrderSchema)