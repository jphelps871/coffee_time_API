const express = require('express');
const router = express.Router();

const CartService = require('../services/cartServices');
const cartServiceInstance = new CartService();

module.exports = (app) => {
  app.use('api/cart', router);

  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;

      const response = await cartServiceInstance.findCartItems(userId);

      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/:userId/:productId', async (req, res, next) => {
    try {
      const { userId, productId } = req.params;

      await cartServiceInstance.addToCart(userId, productId);

      res.send('Added!');
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userId/:productId', async (req, res, next) => {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;

      const response = await cartServiceInstance.updateCart(
        userId,
        productId,
        quantity,
      );

      res.send('Updated');
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:userId/:productId', async (req, res, next) => {
    try {
      // Delete product from user cart
      const { userId, productId } = req.params;

      await cartServiceInstance.deleteFromCart(userId, productId);

      res.send('Deleted!');
    } catch (err) {
      next(err);
    }
  });
};
