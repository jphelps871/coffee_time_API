const AccountModel = require('../model/accountModel');
const AccountModelInstance = new AccountModel();

const createError = require('http-errors');

module.exports = class AccountService {
  async getUserById(id) {
    const response = await AccountModelInstance.getUserById(id);

    if (!response) throw createError(401, 'Sorry, you are unauthorized');

    return response;
  }

  async update(column, value, id) {
    const response = await AccountModelInstance.update(column, value, id);

    if (!response) throw createError(401, 'Sorry, you are unauthorized');

    return response;
  }

  async delete(id) {
    try {
      await this.getUserById(id);

      const response = await AccountModelInstance.delete(id);

      if (!response) throw createError(401, 'Sorry, you are unauthorized');

      return response;
    } catch (err) {
      throw err;
    }
  }
};
