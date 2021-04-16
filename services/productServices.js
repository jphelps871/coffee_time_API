const createError = require('http-errors');
const ProductModel = require('../model/productsModel.js');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async find(data) {
    try {
      const column = Object.keys(data)[0];
      const value = Object.values(data)[0];

      // if no query, return all products
      if (!column || !value) {
        return ProductModelInstance.findAll();
      }

      const result = await ProductModelInstance.find(column, value);

      if (!result)
        throw createError(
          404,
          'Sorry, we could not find any of those products',
        );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id) {
    try {
      const result = await ProductModelInstance.findOne(id);

      if (!result)
        throw createError(404, 'Sorry, we could not find that product');

      return result;
    } catch (err) {
      throw err;
    }
  }
};
