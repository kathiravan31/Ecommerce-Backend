const express = require('express');
const router = express.Router();

const orderController = require('../controller/order.controller');

router.route('/')
    .get(orderController.getOrder)
    .post(orderController.createOrder)
    .put(orderController.putOrder)
router.route('/vendor')
    .get(orderController.getVendorOrder)

module.exports = router;