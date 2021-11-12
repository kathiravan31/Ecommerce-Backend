const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        type: {
            type: String,
            required: [true, 'type is required'],
        },
        image: {
            bucket: {type: String},
            key: {type: String},
            folder: {type: String},
            location: {type: String},
        },
        images: [
            {
                bucket: {type: String},
                key: {type: String},
                folder: {type: String},
                location: {type: String},
            }
        ],
        categories: {
            type: Array,
        },
        size: {
            type: Array,
        },
        color: {
            type: Array,
        },
        price: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            default: true
        },
        vendorId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        description: {
            type: String,
            required: [true, 'description is required']
        },
        discount: {
            type: Number
        },
        specification: {
            type: String
        },
        highlights: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product',ProductSchema);