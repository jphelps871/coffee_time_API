const { pool } = require('../db.js');

module.exports = class ProductModel {
  async find(column, value) {
    try {
      const statement = `SELECT * FROM public.products WHERE ${column} = '${value}'`;

      const response = await pool.query(statement);

      if (response.rows.length !== 0) return response.rows;

      return '';
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const statement = `SELECT * FROM public.products`;

      const response = await pool.query(statement);

      return response.rows;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id) {
    try {
      const statement = `SELECT * FROM public.products WHERE product_id = ${id}`;

      const response = await pool.query(statement);

      if (response.rows.length !== 0) return response.rows;

      return '';
    } catch (err) {
      throw err;
    }
  }
};
