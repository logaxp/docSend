const useUserCase = require('../../domain/usecases/userUseCases');
const { StatusCodes } = require('http-status-codes');
const helper = require('../middlewares/helper');
const roleHelper = require('../middlewares/helper.role');
const relationshipHelper = require('../middlewares/helper.relationship');
const userUseCases = require('../../domain/usecases/userUseCases');

class UserController{

    async fetchAllStaff(req, res){
        try{
            const authUserJwt = req.user;
            const staff = await useUserCase.findStaff(authUserJwt.authId);
            if(staff.length < 1){
                return res.status(StatusCodes.NOT_FOUND).json({msg: 'No Staff record to display'});
            }
            return res.status(StatusCodes.OK).json(staff);
        }catch(error){
            console.error(error.message);
        }
    }

    async searchStaff(req, res) {
        try{
            const keyword = req.query.keyword;
            const adminId = req.user.authId;

            
            const relationship = await relationshipHelper.tenantRelationship(adminId);
            if(!relationship){
                return res.status(StatusCodes.NOT_FOUND).json({msg: 'Tenant not found'})
            }
            const response = await userUseCases.searchStaff(relationship.tenant_id, adminId, keyword)
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
        }
    }

    async deleteStaff(req, res){
        try{
            const staffId = req.params.id;
            const adminId = req.user.authId;

            const {role: role, user: user} = await roleHelper.userRole(adminId)
            if(role.role_name != 'admin'){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'You have no permission to take this action'})
            }

            // Returns the data of the record to be deleted.
            const relationship = await relationshipHelper.tenantRelationship(staffId);

            if(user.tenant_id != relationship.tenant_id){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Relationship Error (Permission contraint)'})
            }
            const response = await useUserCase.deleteStaff(staffId);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = new UserController();

