const { pool } = require('../db.js');

module.exports = class AccountModel {
  async getUserById(id) {
    try {
      const statement = `SELECT user_id, email, first_name, last_name FROM public.user WHERE user_id = ${id}`;

      const result = await pool.query(statement);

      if (result.rows.length !== 0) {
        return result.rows;
      }

      return '';
    } catch (err) {
      throw err;
    }
  }

  async update(column, value, id) {
    try {
      const statement = `UPDATE public.user SET ${column} = '${value}' WHERE user_id = ${id}`;

      const result = await pool.query(statement);

      if (result.rowCount === 1) {
        return result.rowCount;
      }

      return '';
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      const statement = `DELETE FROM public.user WHERE user_id = ${id}`;

      const result = await pool.query(statement);

      if (result.rowCount === 1) {
        return result.rowCount;
      }

      return '';
    } catch (err) {
      throw err;
    }
  }
};
