const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')

router.route('/')
    .get(authController.login)
    .post(authController.register)
router.route('/forgot-password')
    .put(authController.forgorPassword)


module.exports = router;