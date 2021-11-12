const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'userId is required']
        },
        landmark: {
            type: String,
        },
        street: {
            type: String,
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
    }
)

module.exports = mongoose.model('Address', AddressSchema);