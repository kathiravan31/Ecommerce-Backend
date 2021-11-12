const router = require('express').Router();

const paymentController = require('../controller/payment.controller');

router.route('/payment')
    .post(paymentController.postPayment)

module.exports = router;