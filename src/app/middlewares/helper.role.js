const { Op } = require('sequelize');
const db = require('../../domain/models/index');
const { User, Role } = db;

module.exports = {
    userRole: async (userId) => {
        // Returns user and userRole data
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                const role = await Role.findOne({ where: { id: user.role_id } });
                return {role: role, user: user};
            } else {
                return false;
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }        
    },
}




