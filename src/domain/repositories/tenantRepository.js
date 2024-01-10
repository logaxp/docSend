const { Op } = require('sequelize');
const db = require('../models/index');
const helper = require('../../app/middlewares/helper');
const { sendVerificationEmail } = require('../../infrastructure/external-services/emailService');
const { Tenant, User, Session } = db;

class TenantRepository{

    async createTenant(tenantData, transaction){
        return await Tenant.create(tenantData, {transaction});
    }

    async activateTenant(activationCode){
        // activate tenant to verify submitted data
        return await User.update(
            {verification_code: '', status: 1},
            {where: {verification_code: activationCode}}
            ).then((status) => {
            const affectedRow = status[0];
            if(affectedRow > 0){
                return true;
            }else{
                return false;
            }
        });
    }

    async resendOTP(OTPEmail){
        try{
            const user = await User.findOne({
                where: {
                    [Op.and]: { email: OTPEmail, status: 0 }
                }
            });
            if(user){
                const verificationCode = await helper.generateVerificationCode();
                await sendVerificationEmail(user.email, user.firstname, verificationCode);
                return await User.update(
                    { verification_code: verificationCode },
                    { 
                        where: { email: OTPEmail, status: 0 }
                    }
                );
            }
        }catch(error){
            console.log(error);
        }
    }

    async loginTenant(loginEmail){
        // check if Tenant email exists.
        const user = await User.findOne({
            where: { email: loginEmail }
        });
        
        const tenant = await Tenant.findOne({
            where: { id: user.tenant_id }
        });

        const newTenant = { ...user, tenantData: tenant}
        return newTenant;
    }

    async logTenantSession(session){
        const isSession = await Session.findOne({
            where: {user_id: session.user_id}
        });
        if(!isSession){
            return await Session.create(session);
        }
        return isSession;
    }

    async logoutTenant(Id){
        const session = await Session.findOne({
            where: {user_id: Id}
        });

        if(!session){
            return
        }
        return await Session.update(
            {user_id: ''},
            {
                where: {user_id: Id}
            }
        );
    }

    async createTenantStream(streamData, transaction){
        return await User.create(streamData, {transaction});
    }

    async listTenantStream(tenant){
        try{
            // console.log(tenant.tenant_id)
            const streamList = await User.findAll({
                where: {
                    tenant_id: tenant.tenant_id,
                    role_id: {
                        [Op.notIn]: [1, 2]
                    }
                }
            });
            
            return streamList;
        }catch(error){
            console.error(error.message)
        }
    }

}

module.exports = new TenantRepository();

