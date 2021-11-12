const express = require('express');
const router = express.Router();

const shopController = require('../controller/shop.controller');

router.route('/')
    .post(shopController.createShop)
    .get(shopController.getShop)
    .put(shopController.putShop)
    .delete(shopController.deleteShop)

module.exports = router;