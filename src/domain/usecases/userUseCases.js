const db = require('../models/index');
const userRespository = require('../repositories/userRepository');
// const tenantRepository = require('../repositories/tenantRepository');

class UserUseCase {
  async findStaff(Id) {
    
    try {

      return await userRespository.findStaff(Id);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new UserUseCase();
