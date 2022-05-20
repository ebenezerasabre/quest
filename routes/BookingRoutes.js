const express = require('express');
const bookRouter = express.Router();
const BookingController = require('../controllers/BookingController');

bookRouter.get('/', BookingController.findAllBookings);
bookRouter.get('/count', BookingController.countBookings);
bookRouter.get('/:id', BookingController.findBookingById);
bookRouter.get('type/:id', BookingController.findBookingByCarType);
bookRouter.post('/', BookingController.createBook);

bookRouter.put('/:id', BookingController.updateBooking);
bookRouter.delete('/:id', BookingController.deleteBooking);
bookRouter.delete('/', BookingController.deleteAllBooks);

module.exports = bookRouter;