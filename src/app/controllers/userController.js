const useUserCase = require('../../domain/usecases/userUseCases');
const { StatusCodes } = require('http-status-codes');
const helper = require('../middlewares/helper');

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

}

module.exports = new UserController();

