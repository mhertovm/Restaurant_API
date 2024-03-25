const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.get('/user', usersController.user);
router.get('/orders', usersController.orders);
router.get('/bookings', usersController.bookings);
router.post('/addOrder', usersController.addOrder);
router.post('/addBooking', usersController.addBooking);
router.patch('/updateOrder/:id', usersController.updateOrder);
router.put('/updateBooking/:id', usersController.updateBooking);
router.delete('/deleteOrder/:id', usersController.deleteOrder);
router.delete('/deleteBooking/:id', usersController.deleteBooking);

module.exports = router;