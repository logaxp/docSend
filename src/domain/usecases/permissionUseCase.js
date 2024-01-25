const permissionRepository = require('../repositories/permissionRepository');
const db = require('../models/index');
const { SharedDocument } = db;

class PermissionUseCase{
    async fetchAllPermission(){
        const response = await permissionRepository.fetchAllPermission();
        return response;
    }

    async updateStaffDocumentPermission(authId, query){
        try{
            const owner = await SharedDocument.findOne({
                where: {sender_id: query.sender_id, access_token: query.access_token}
            });
    
            if(!owner){
                return { success: false, msg: "You don't permission to perform this action", status: 400 }
            }
            const response = await permissionRepository.updateStaffDocumentPermission(query);
            return response;
        }catch(error){
            return { success: false, msg: 'Internal Server Error', status: 500 }
        }
    }

    async removeStaffDocumentPermission(authId, query){
        try{
            const owner = await SharedDocument.findOne({
                where: { sender_id: query.sender_id, access_token: query.access_token }
            });
    
            if(!owner){
                return { success: false, msg: "You don't permission to perform this action", status: 400 }
            }
            const response = await permissionRepository.removeStaffDocumentPermission(query);
            return response;
        }catch(error){
            return { success: false, msg: 'Internal Server Error', status: 500 }
        }
    }
}

module.exports = new PermissionUseCase();
