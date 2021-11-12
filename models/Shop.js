const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ShopSchema = new mongoose.Schema(
    {   
        vendorId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'name is required']
        },
        type: {
            type: String,
            required: [true, 'type is required']
        },
        mobile: {
            type: String,
            required: [true, 'mobile is required']
        },
        landmark: {
            type: String,
            required: [true, 'landmark is required']
        },
        street: {
            type: String,
            required: [true, 'street is required']
        },
        city: {
            type: String,
            required: [true, 'city is required']
        },
        state: {
            type: String,
            required: [true, 'state is required']
        },
        country: {
            type: String,
            required: [true, 'country is required']
        },
        pincode: {
            type: String,
            required: [true, 'pincode is required']
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

ShopSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Shop', ShopSchema);