const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'firstName is required']
        },
        last_name: {
            type: String
        },
        mobile_number: {
            type: String,
            required: [true, 'mobile is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            // select: false
        },
        active: {
            type: Boolean,
            default: true
        },
        isAdmin: {
            type: Boolean
        },
        isVendor: {
            type: Boolean
        }
    },
    {timestamps: true}
)

UserSchema.plugin(uniqueValidator, {message: '{PATH} already exists'});

UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const hashpassword = await bcrypt.hash(user.password, 10);
    user.password = hashpassword;
    next();
});

UserSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User',UserSchema);