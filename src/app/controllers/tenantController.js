const { body, validationResult } = require('express-validator');
const useTenantCase = require('../../domain/usecases/tenantUseCases');
const { StatusCodes } = require('http-status-codes');
const helper = require('../middlewares/helper');
const formHelper = require('../middlewares/helper.form');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config();

class TenantController {
  async createTenant(req, res) {
    try {

        // Run the form validation middleware
        const validateTenantForm = formHelper.signupValidation();
        await Promise.all(validateTenantForm.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }

        // Continue with your existing logic
        const payload = req.body;

        const userData = {
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email,
            phone_no: payload.phone_no,
            password: payload.password,
            type: payload.type,
        };

        const tenantData = { tenant_name: payload.tenant_name };

        // Create new user if all conditions are passed
        const user = await useTenantCase.createTenant(tenantData, userData);

        // Generate login token for user
        const token = await helper.createJWT(user.id, user.email);

        const data = {
            id: user.id,
            email: user.email,
            token: token,
            status: StatusCodes.CREATED,
        };
        res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    async activateTenant(req, res){
        const activationCode = req.body.code;
        try{
            const response = await useTenantCase.activateTenant(activationCode);
            
            if(response === true){
                return res.status(StatusCodes.OK).json({
                    msg: 'Account activation was successful!', 
                    status: StatusCodes.OK,
                    didUpdate: response
                })
            }else{
                return res.status(StatusCodes.OK).json({
                    msg: 'Account activation was unsuccessful', 
                    status: StatusCodes.OK,
                    didUpdate: response
                });
            }
        }catch(error){
            console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    async loginTenant(req, res){
        const loginData = req.body;
       try{

            // Run the form validation middleware
            const validateLoginForm = formHelper.loginFormValidator();
            await Promise.all(validateLoginForm.map(validation => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }
            const user = await useTenantCase.loginTenant(loginData);
            const name = user.firstname +' '+ user.lastname;
            // console.log(loginData.password);
            const correctPassword = await bcrypt.compare(loginData.password, user.password);

            if(!correctPassword){
                return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Incorrect user credential'});
            }

            // Generate token for existing tenant
            const token = await helper.createJWT(user.id, user.email);
            
            return res.status(StatusCodes.OK).json({fullname: name, email: user.email, token: token});

       }catch(error){
         throw new Error(error);
       }
    }

}

module.exports = new TenantController();
