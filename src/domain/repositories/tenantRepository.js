const db = require('../models/index');
const { Tenant, User } = db;

class TenantRepository{

    async create(tenantData, transaction){
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

        // check if user email exist
        const tenant = await User.findOne({
            where: { email: loginEmail }
        });
        return tenant;
    }

}

module.exports = new TenantRepository();

