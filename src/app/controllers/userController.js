const useUserCase = require('../../domain/usecases/userUseCases');
const { StatusCodes } = require('http-status-codes');
const helper = require('../middlewares/helper');
const roleHelper = require('../middlewares/helper.role');
const relationshipHelper = require('../middlewares/helper.relationship');

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

    async deleteStaff(req, res){
        try{
            const staffId = req.params.id;
            const adminId = req.user.authId;

            const role = await roleHelper.userRole(adminId)
            console.log(role);
            if(role.role_name != 'admin'){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'You have no permission to take this action'})
            }

            const relationship = await relationshipHelper.tenantRelationship(staffId);
            if(role.tenant_id != relationship.tenant_id){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Relationship Error'})
            }
            const response = await useUserCase.deleteStaff(adminId, staffId);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = new UserController();

