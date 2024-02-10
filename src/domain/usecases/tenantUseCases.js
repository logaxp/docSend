const db = require('../models/index');
const { Role, User } = db;
const tenantRespository = require('../repositories/tenantRepository');
const userRespository = require('../repositories/userRepository');
const { sendVerificationEmail } = require('../../infrastructure/external-services/emailService');
const helper = require('../../app/middlewares/helper');
const { Op } = require('sequelize');

class TenantUseCase{

    async createTenant(tenantData, userData){
        let transaction;
        try{
            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();
           
            // tentant business logic
            const tenant = await tenantRespository.createTenant(tenantData, transaction);
            
            // role business logic
            const role = await Role.findOne({ 
                where: {id: 2} // Role with id(2) => admin
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
            throw new Error(console.error(error.message))
        }

    }

    async activateTenant(activationCode){
        console.log(activationCode)
        // Tenant account activation business logic
        const response = await tenantRespository.activateTenant(activationCode)
        return response;
    }

    async resendOTP(OTPEmail){
        const response = await tenantRespository.resendOTP(OTPEmail);
        return response;
    }

    async loginTenant(loginData){
        // Tenant account login business logic
        const loginEmail = loginData.email;
        const response = await tenantRespository.loginTenant(loginEmail)
        // console.log(response)
        return response;
    }

    // async logTenantSession(session){
    //     // Store logged in tenant session on the db
    //     const response = await tenantRespository.logTenantSession(session)
    //     return response;
    // }

    async logoutTenant(Id){
        const response = await tenantRespository.logoutTenant(Id)
        return response;
    }

    async createTenantStream(authUserJwt, streamData){
        let transaction;
        try{
            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();

            const user = await User.findOne({where: { id: authUserJwt.authId }})
            if(!user){
                throw new Error('Please login with your credentials')
            }

            const prefix = streamData.firstname.toLowerCase().charAt(0) + streamData.lastname.toLowerCase() + '@';
            const password = await helper.generatePassword(prefix);

            const newStreamData = {
                ...streamData, 
                tenant_id: user.tenant_id,
                password: password,
                status: 1,
            }
            const stream = await tenantRespository.createTenantStream(newStreamData, transaction);
            await transaction.commit();
            return stream;


        }catch(error){
            // Check if transaction is defined before attempting rollback
            if (transaction) {
                await transaction.rollback();
            }
            // console.log(error);
            throw new Error(console.error(error.message));
        }
    }

    async listTenantStream(tenantData){
        // List Tenant Streams
        try{

            const tenant = await User.findOne({
                where: {id: tenantData.authId}
            })
            const tenantStreamList = await tenantRespository.listTenantStream(tenant)
            return tenantStreamList;
        }catch(error){
            console.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }


}

module.exports = new TenantUseCase();