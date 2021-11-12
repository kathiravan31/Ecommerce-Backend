const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');

router.route('/')
    .post(productController.postProduct)
    .get(productController.getProducts)
    .put(productController.putProduct)
    .delete(productController.deleteProduct)

module.exports = router;