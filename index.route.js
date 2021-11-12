const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const authRoute = require('./router/auth.route');
const userRoute = require('./router/user.route');
const productRoute = require('./router/product.route');
const reviewRoute = require('./router/review.route');
const shopRoute = require('./router/shop.route');
const addressRoute = require('./router/address.route');
const cartRoute = require('./router/cart.router');
const orderRoute = require('./router/order.route');
const paymentRoute = require('./router/stripe.router');

router.use('/auth',authRoute);
router.use('/user',expressJWT({secret: 'secret', algorithms:['HS256']}),userRoute);
router.use('/product',expressJWT({secret: 'secret', algorithms:['HS256']}),productRoute);
router.use('/review',expressJWT({secret:'secret',algorithms:['HS256']}),reviewRoute);
router.use('/shop',expressJWT({secret: 'secret',algorithms:['HS256']}),shopRoute);
router.use('/address',expressJWT({secret: 'secret',algorithms:['HS256']}),addressRoute);
router.use('/cart',expressJWT({secret: 'secret',algorithms:['HS256']}),cartRoute);
router.use('/order',expressJWT({secret: 'secret',algorithms:['HS256']}),orderRoute);
router.use('/checkout',paymentRoute);

module.exports = router; 