const express = require('express');
const router = express.Router();

const ProductService = require('../services/productServices.js');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {
  app.use('/api/products', router);

  router.get('/', async (req, res, next) => {
    try {
      const data = req.query;

      const response = await ProductServiceInstance.find(data);

      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:productId', async (req, res, next) => {
    try {
      const id = req.params.productId;

      const response = await ProductServiceInstance.findOne(id);

      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};
