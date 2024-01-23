const db = require('../models/index');
const { User, Role } = db;
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

  async updateStaffRole(staffData){
    try{

        const roleInfo = await Role.findOne({where: {id: staffData.role_id}});

        if(!roleInfo || roleInfo.role_name == 'super admin'){
          return { success: false, msg: 'Role id constraints error', status: 400 }
        }

        const response = await userRespository.updateStaffRole(staffData)
        return response;
    }catch(error){
      console.error(error);
    }
  }


}

module.exports = new UserUseCase();
