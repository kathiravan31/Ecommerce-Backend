const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart.controller');

router.route('/')
    .post(cartController.postCart)
    .get(cartController.getCart)
    .put(cartController.putCart)
    .delete(cartController.deleteCart)

module.exports = router;