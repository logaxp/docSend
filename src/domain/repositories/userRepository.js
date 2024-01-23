const { Op } = require('sequelize');
const db = require('../models/index');
const { User, Role } = db;

class UserRespository{

    async create(userData, transaction){
        return await User.create(userData, {transaction})
    }

    async findStaff(Id){
        try {
            const user = await User.findOne({ where: { id: Id } });
            if (!user) {
              return; // or return some default value, depending on your use case
            }
          
            // Return all staff that share Tenant data except that of the initiator
            const data = await User.findAll({
              where: { tenant_id: user.tenant_id, [Op.not]: { id: Id } },
            });
          
            const result = await Promise.all(
              data.map(async (_user) => {
                const {
                  dataValues: {
                    id,
                    firstname,
                    lastname,
                    email,
                    phone_no,
                    type,
                    status,
                    createdAt,
                    updatedAt,
                    tenant_id,
                    role_id,
                  },
                } = _user;
          
                // Find the role information based on role_id
                const _role = await Role.findOne({ where: { id: role_id } });
                return {
                  id,
                  firstname,
                  lastname,
                  email,
                  phone_no,
                  type,
                  status: status==0?'Unverified':'Verified',
                  createdAt,
                  updatedAt,
                  tenant_id,
                  role: _role ? _role.role_name : 'Unknown', // Default to 'Unknown' if role not found
                };
              })
            );
          
            return result;
          } catch (error) {
            throw new Error(error);
          }
          
    }

    async searchStaff(tenantId, adminId, keyword){
        try {
            return await User.findAll({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { firstname: { [Op.like]: `%${keyword}%` } },
                        { lastname: { [Op.like]: `%${keyword}%` } },
                        { email: { [Op.like]: `%${keyword}%` } },
                        { phone_no: { [Op.like]: `%${keyword}%` } },
                      ]
                    },
                    { tenant_id: tenantId },
                    { id: { [Op.ne]: adminId } } // Exclude the current user
                  ]
                }
              });
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
    }

    async deleteStaff(staffId) {
        try {
            const result = await User.destroy({
                where: { id: staffId }
            });
        
            if (result === 0) {
                throw new Error("User not found or not deleted");
            }
            return { success: true, msg: "User deleted successfully" };
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
        
      }

      async updateStaffRole(staffData){
        try {
          const result = await User.update(
            { role_id: staffData.role_id },
            { where: { id: staffData.id } }
          );
        
          if (result[0] === 1) {
            return { success: true, msg: "Staff role updated successfully", status: 200 };
          }
        
          return { success: false, msg: "There was a problem updating staff's role", status: 500 };
        } catch (error) {
          console.error(error);
        }        
      }
}

module.exports = new UserRespository();

