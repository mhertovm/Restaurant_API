const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
router.get('/', productsController.products);
router.get('/oneProduct/:id', productsController.oneProduct);
router.get('/categories', productsController.categories);
router.get('/tables', productsController.tables);
module.exports = router;