const db = require('../models/index');
const { User } = db;
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

  async searchStaff(tenantId, adminId, keyword){
    try {
      return await userRespository.searchStaff(tenantId, adminId, keyword);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteStaff(staffId) {
    try {
      return await userRespository.deleteStaff(staffId);
    } catch (error) {
      throw new Error(error);
    }
  }


}

module.exports = new UserUseCase();
