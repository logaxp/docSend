const { StatusCodes } = require('http-status-codes');
const permissionUseCase = require('../../domain/usecases/permissionUseCase');

class PermissionController{
    async fetchAllPermission(req, res){
        try{
            const response = await permissionUseCase.fetchAllPermission();
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error('Error getting permission list:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async updateStaffDocumentPermission(req, res){
        try{
            const query = req.query;
            const authId = req.user.authId;

            const response = await permissionUseCase.updateStaffDocumentPermission(authId, query);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error('Error updating staff document permission:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async removeStaffDocumentPermission(req, res){
        try{
            const query = req.query;
            const authId = req.user.authId;

            const response = await permissionUseCase.removeStaffDocumentPermission(authId, query);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error('Error removing staff document permission:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }
}

module.exports = new PermissionController();








