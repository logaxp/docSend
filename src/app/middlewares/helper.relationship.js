const db = require('../../domain/models/index')
const { User } = db;

module.exports = {
    tenantRelationship: async (id) =>{
        try {
            const user = await User.findOne({ where: { id: id } });
        
            if (user) {
                return user.tenant_id;
            }
            
            return Promise.reject({ reason: "User doesn't exist error" });
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    },
}