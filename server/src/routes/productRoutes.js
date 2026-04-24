const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, vendor } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, vendor, createProduct);
router.get('/:id', getProductById);

module.exports = router;
