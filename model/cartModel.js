const { pool } = require('../db.js');

module.exports = class CartModel {
  async findCartItems(userId) {
    try {
      const statement = `
        SELECT products.name, 
          products.price, 
          products.description 
        FROM public.cart
        JOIN public.cart_item
          ON public.cart.cart_id = public.cart_item.cart_id
        JOIN public.products
         ON public.cart_item.product_id = public.products.product_id
        WHERE cart.user_id = ${userId};
      `;

      const result = await pool.query(statement);

      if (result.rows.length !== 0) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw err;
    }
  }

  async findUserCart(userId) {
    try {
      const statement = `SELECT * FROM public.cart WHERE user_id = ${userId}`;

      const result = await pool.query(statement);

      if (result.rows.length !== 0) {
        return result.rows[0].cart_id;
      }

      return '';
    } catch (err) {
      throw err;
    }
  }

  async createUserCart(userId) {
    try {
      const statement = `
        INSERT into public.cart(user_id) 
        VALUES (${userId}) RETURNING cart_id
      `;

      const result = await pool.query(statement);

      return result.rows[0].cart_id;
    } catch (err) {
      throw err;
    }
  }

  async addProductToCart(productId, cartId) {
    try {
      const statement = `INSERT INTO public.cart_item VALUES (${productId}, ${cartId})`;

      const response = await pool.query(statement);

      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateCart(cartId, productId, quantity) {
    try {
      const statement = `
        UPDATE public.cart_item
          SET quantity = ${quantity}
          WHERE cart_id = ${cartId}
          AND product_id = ${productId}
      `;

      const result = await pool.query(statement);

      if (result.rowCount !== 0) return result.rowCount;

      return '';
    } catch (err) {
      throw err;
    }
  }

  async deleteFromCart(cartId, productId) {
    try {
      const statement = `
        DELETE FROM public.cart_item
          WHERE cart_id = ${cartId}
          AND product_id = ${productId};
      `;

      const response = await pool.query(statement);

      if (response.rowCount !== 0) {
        return true;
      }

      return '';
    } catch (err) {
      throw err;
    }
  }
};
