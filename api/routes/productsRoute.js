const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
router.get('/l', productsController.login);
module.exports = router;