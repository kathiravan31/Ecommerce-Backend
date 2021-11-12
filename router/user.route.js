const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');

router.route('/')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser)
router.route('/status')
    .put(userController.changeStatus)


module.exports = router;