const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.get('/l', usersController.login);
module.exports = router;