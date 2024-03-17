const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminsController');
router.post('/addCategory', adminController.addCategory);
router.post('/addProduct', adminController.addProduct);
router.post('/addTable', adminController.addTable);
router.patch('/updateCategory/:id', adminController.updateCategory);
router.patch('/updateProduct/:id', adminController.updateProduct);
router.patch('/updateTable/:id', adminController.updateTable);
module.exports = router;