const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.post('/addOrder', usersController.addOrder);
router.patch('/updateOrder/:id', usersController.updateOrder);
router.delete('/deleteOrder/:id', usersController.deleteOrder);

module.exports = router;