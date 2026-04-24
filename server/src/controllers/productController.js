const Product = require('../models/Product');
const mongoose = require('mongoose');

async function getProducts(_req, res, next) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404);
      throw new Error('Product not found');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      countInStock
    } = req.body;

    if (!name || !description || !image || !category) {
      res.status(400);
      throw new Error('Please provide name, description, image, and category');
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      res.status(400);
      throw new Error('Please provide a valid price');
    }

    if (!Number.isFinite(Number(countInStock)) || Number(countInStock) < 0) {
      res.status(400);
      throw new Error('Please provide a valid stock quantity');
    }

    const createdProduct = await Product.create({
      seller: req.user._id,
      sellerName: req.user.name,
      name: String(name).trim(),
      description: String(description).trim(),
      image: String(image).trim(),
      category: String(category).trim(),
      price: Number(price),
      countInStock: Number(countInStock)
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct
};
