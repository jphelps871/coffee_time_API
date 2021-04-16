const { pool } = require('../db.js');

module.exports = class User {
  async findByEmail(email) {
    try {
      const response = await pool.query(
        `SELECT * FROM public.user WHERE email = '${email}';`,
      );

      if (response.rows.length !== 0) {
        return response.rows[0];
      }

      return '';
    } catch (err) {
      throw err;
    }
  }

  async register({ email, password, firstName, lastName }) {
    try {
      const response = await pool.query(
        `INSERT INTO public."user"(email, password, first_name, last_name) VALUES ('${email}', '${password}', '${firstName}', '${lastName}')`,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
};
