const Product = require('../models/Product');

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

module.exports = {
  getProducts,
  getProductById
};
