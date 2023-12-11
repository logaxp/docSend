const { Op } = require('sequelize');
const db = require('../models/index');
const { Tenant, User } = db;

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

    async loginTenant(loginEmail){
        // check if Tenant email exists.
        const tenant = await User.findOne({
            where: { email: loginEmail }
        });
        return tenant;
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

