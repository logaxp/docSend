const db = require('../models/index');
const { Role } = db;
const tenantRespository = require('../repositories/tenantRepository');
const userRespository = require('../repositories/userRepository');

class TenantUseCase{

    async createTenant(tenantData, userData){
        let transaction;
        try{
            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();
           
            // tentant business logic
            const tenant = await tenantRespository.create(tenantData, transaction);
            
            // role business logic
            const role = await Role.findOne({ 
                where: {id: 1} 
            });

            // user business logic
            const newUserData = { ...userData, tenant_id: tenant.id, role_id: role.id };
            const user = await userRespository.create(newUserData, transaction);

            await transaction.commit();
            return user;
        }catch(error){
            // Check if transaction is defined before attempting rollback
            if (transaction) {
                await transaction.rollback();
            }
            throw new Error(error)
        }

    }

    async activateTenant(activationCode){
        // Tenant account activation busines login
        const response = await tenantRespository.activateTenant(activationCode)
        return response;
    }

    async loginTenant(loginData){
        const loginEmail = loginData.email;
        const response = await tenantRespository.loginTenant(loginEmail)

        // console.log(response.password);

        return response;
    }

}

module.exports = new TenantUseCase();