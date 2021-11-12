const express = require('express');
const router = express.Router();

const reviewController = require('../controller/review.controller');

router.route('/')
    .post(reviewController.postReview)
    .get(reviewController.getReview)
    .put(reviewController.putReview)
    .delete(reviewController.deleteReview)

module.exports = router;