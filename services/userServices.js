const userModel = require('../model/userModel.js');
const createError = require('http-errors');
const userService = new userModel();
const bcrypt = require('bcrypt');

module.exports = class UserService {
  async findByEmail(email) {
    try {
      const response = await userService.findByEmail(email);

      if (!response) return '';

      return response;
    } catch (err) {
      throw err;
    }
  }

  async register(userCredentials) {
    try {
      const emailExists = await this.findByEmail(userCredentials.email);

      if (emailExists) return 'This email already exists';

      userCredentials.password = await bcrypt.hash(
        userCredentials.password,
        10,
      );

      const response = await userService.register(userCredentials);

      if (response) return 'Thank you for registering!';

      throw createError(409, 'Unable to register user');
    } catch (err) {
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.findByEmail(email);

      if (!user) throw createError(401, 'Incorrect email');

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) throw createError(404, 'Incorrect password');

      return user;
    } catch (err) {
      throw err;
    }
  }
};
