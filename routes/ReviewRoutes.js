const express = require('express');
const reviewRouter = express.Router();
const ReviewController = require('../controllers/ReviewController');

reviewRouter.get('/', ReviewController.findAllReviews);
reviewRouter.get('/count', ReviewController.countReviews);
reviewRouter.get('/user/:id', ReviewController.findUserReviews);
reviewRouter.get('/:id', ReviewController.findReviewById);

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.put('/:id', ReviewController.updateReview);
reviewRouter.delete('/:id', ReviewController.deleteReview);
reviewRouter.delete('/', ReviewController.deleteAllReviews);

module.exports = reviewRouter;