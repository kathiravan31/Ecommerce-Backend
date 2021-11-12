const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VendorOrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'userid is required']
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'productId is required']
        },
        vendorId: {
            type: mongoose.Types.ObjectId,
            ref: 'Vendor',
            required: [true, 'vendorId is required']
        },
        orderId: {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        },
        status: {
            type: String,
            default: true
        }
    },
    {timestamps: true}
)

VendorOrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('VendorOrder', VendorOrderSchema)