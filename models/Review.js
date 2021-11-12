const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: [true, 'userId is required']
        },
        productId: {
            type: mongoose.Types.ObjectId,
            required: [true, 'productId is required']
        },
        message: {
            type: String,
            required: [true, 'message is required']
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Review', ReviewSchema)