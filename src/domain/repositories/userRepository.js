const { Op } = require('sequelize');
const db = require('../models/index');
const { User } = db;

class UserRespository{

    async create(userData, transaction){
        return await User.create(userData, {transaction})
    }

    async findStaff(Id){
        try{
            const user = await User.findOne({ where: {id: Id} });
            if(!user){
                return
            }
            // Return all saff that share Tenant data except that of the initiator
            return await User.findAll({ 
                where: {
                    tenant_id: user.tenant_id,
                    [Op.not]: {id: Id}
                }
            });

        }catch(error){
            throw new Error(error)
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
}

module.exports = new UserRespository();

