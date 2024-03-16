const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
router.post('/login', publicController.login);
router.post('/register', publicController.register);
module.exports = router;