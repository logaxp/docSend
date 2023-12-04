const db = require('../models/index');
const userRespository = require('../repositories/userRepository');
// const tenantRepository = require('../repositories/tenantRepository');

class UserUseCase {
  async createUser(userData) {
    
    try {

      // user business logic
      const user = await userRespository.create(userData, transaction);
      return user;

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new UserUseCase();
