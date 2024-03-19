const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminsController');
const upload = require('../middlewares/upload')
router.post('/addCategory', adminController.addCategory);
router.post('/addProduct', adminController.addProduct);
router.post('/addTable', adminController.addTable);
router.post('/upload', upload.single('image'), adminController.upload);
router.patch('/updateCategory/:id', adminController.updateCategory);
router.patch('/updateProduct/:id', adminController.updateProduct);
router.patch('/updateTable/:id', adminController.updateTable);
router.delete('/deleteCategory/:id', adminController.deleteCategory);
router.delete('/deleteProduct/:id', adminController.deleteProduct);
router.delete('/deleteTable/:id', adminController.deleteTable);
module.exports = router;