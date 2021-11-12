const express = require('express');
const router = express.Router();


const addressController = require('../controller/address.controller');

router.route('/')
    .post(addressController.postAddress)
    .get(addressController.getAddress)
    .put(addressController.putAddress)
    .delete(addressController.deleteAddress)

module.exports = router;