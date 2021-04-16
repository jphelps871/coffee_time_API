const createError = require('http-errors');
const CartModel = require('../model/cartModel');
const CartModelInstance = new CartModel();

module.exports = class CartService {
  async findCartItems(userId) {
    try {
      const result = await CartModelInstance.findCartItems(userId);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async findUserCart(userId) {
    try {
      const userCart = await CartModelInstance.findUserCart(userId);

      return userCart;
    } catch (err) {
      throw err;
    }
  }

  async addToCart(userId, productId) {
    try {
      let cartId = await this.findUserCart(userId);

      // Create user cart if user has not got one
      if (!cartId) cartId = await CartModelInstance.createUserCart(userId);

      const result = await CartModelInstance.addProductToCart(
        productId,
        cartId,
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateCart(userId, productId, quantity) {
    const cartId = await this.findUserCart(userId);

    const response = await CartModelInstance.updateCart(
      cartId,
      productId,
      quantity,
    );

    if (!response) throw createError(409, 'Unable to update');

    return response;
  }

  async deleteFromCart(userId, productId) {
    try {
      const cartId = await this.findUserCart(userId);

      const response = await CartModelInstance.deleteFromCart(
        cartId,
        productId,
      );

      if (!response) throw createError(409, 'Unable to delete');

      return response;
    } catch (err) {}
  }
};
