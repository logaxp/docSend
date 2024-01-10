const { Op } = require('sequelize');
const db = require('../models/index');
const { User } = db;

class UserRespository{

    async findStaff(Id){
        try{
            // user creation within the transaction
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
}

module.exports = new UserRespository();

