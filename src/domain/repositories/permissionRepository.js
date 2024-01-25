const db = require('../models/index');
const { Permissions, SharedDocument } = db;

class PermissionRepository{
    async fetchAllPermission() {
        try {
            const result = await Permissions.findAll({attributes: ['id', 'name', 'createdAt', 'updatedAt']});
    
            if (result.length < 1) {
                return { success: true, msg: 'No permission record', status: 404 };
            }
    
            return { data: result, success: true, status: 200 };
        } catch (error) {
            console.error('Error fetching permissions:', error);
            return { success: false, msg: 'Internal server error', status: 500 };
        }
    }

    async updateStaffDocumentPermission(query) {
        try {
            const result = await SharedDocument.update(
                { permission: query.permission },
                { where: { sender_id: query.sender_id, receiver_email: query.receiver_email } }
            );
    
            if (result[0] > 0) {
                return { success: true, msg: 'Staff permission updated successfully', status: 200 };
            } else {
                return { success: false, msg: 'Error updating Staff permission', status: 400 };
            }
    
        } catch (error) {
            console.error('Error updating staff document permission:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async removeStaffDocumentPermission(query) {
        try {
            const result = await SharedDocument.destroy(
                { 
                    where: { 
                        sender_id: query.sender_id, 
                        receiver_email: query.receiver_email, 
                        access_token: query.access_token 
                    }
                }
            );
    
            if (result > 0) {
                return { success: true, msg: 'Staff permission removed successfully', status: 200 };
            } else {
                return { success: false, msg: 'Error removing Staff permission', status: 400 };
            }
    
        } catch (error) {
            console.error('Error removing staff document permission:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }
    
    
    
}

module.exports = new PermissionRepository();
