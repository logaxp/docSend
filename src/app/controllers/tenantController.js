const { validationResult } = require('express-validator');
const useTenantCase = require('../../domain/usecases/tenantUseCases');
const { sendVerificationEmail } = require('../../infrastructure/external-services/emailService');
const { StatusCodes } = require('http-status-codes');
const helper = require('../middlewares/helper');
const formHelper = require('../middlewares/helper.form');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config();

class TenantController {
  async createTenant(req, res) {
    try {

        // console.log("entry", req.body)
        // Run the form validation middleware
        const validateTenantForm = formHelper.signupValidation();
        await Promise.all(validateTenantForm.map(validation => validation.run(req)));
        // Check for validation errors
        
        const errors = validationResult(req);
        // console.log("entry", errors)
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

        const tenantName = payload.tenant_name!==''?payload.tenant_name:payload.firstname[0].toUpperCase()+payload.lastname[0].toUpperCase();
        const tenantData = { tenant_name: tenantName };

        // Create new user if all conditions are passed
        const user = await useTenantCase.createTenant(tenantData, userData);

        // Generate login token for user
        const token = await helper.createJWT(user.id, user.email, user.tenant_id);

        const data = {
            id: user.id,
            email: user.email,
            token: token,
            status: StatusCodes.CREATED,
        };
        res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            console.error(error.message); //Display the error message
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    async activateTenant(req, res){
        /*
        *   handles new Tentant account activation.
        */

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
            console.error(error.message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    async resendOTP(req, res){
        try{
            const email = req.body.email;
            if(!email){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'OTP email is not provided'});
            }
            const isEmailNotVerified = await formHelper.isEmailVerified(email);
            if(isEmailNotVerified){
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'OTP email is already verified, Please login to your account'});
            }
            const response = await useTenantCase.resendOTP(email);
            if(response === 0){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    msg: 'There was an error sending an OTP email',
                    status: StatusCodes.INTERNAL_SERVER_ERROR
                });
            }
            return res.status(StatusCodes.OK).json({
                msg: 'Email verification token has been sent to your email',
                status: StatusCodes.OK
            });

        }catch(error){
            console.log(error);
        }
    }

    async loginTenant(req, res){

        /*
        * Handles Tenant login authentication.
        */

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
            if(!user){
                return res.status(StatusCodes.NOT_FOUND).json({msg: "Account not found", status: StatusCodes.NOT_FOUND});
            }

            
            const correctPassword = await bcrypt.compare(loginData.password, user.dataValues.password);

            if(!correctPassword){
                return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Incorrect user credential'});
            }

            // Generate token for existing tenant
            const token = await helper.createJWT(user.id, user.dataValues.email);

            const name = user.dataValues.firstname +' '+ user.dataValues.lastname;

            return res.status(StatusCodes.OK).json({
                fullname: name, 
                email: user.dataValues.email, 
                token: token, tenant: user.tenantData});

       }catch(error){
            console.error(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
       }
    }

    async createTenantStream(req, res) {
        try{

            // Run the form validation middleware
            const validateStreamForm = formHelper.streamFormValidator();
            await Promise.all(validateStreamForm.map(validation => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }
            
            const streamData = req.body;
            const authUserJwt = req.user;

            const tenantStream = await useTenantCase.createTenantStream(authUserJwt, streamData);
            return res.status(StatusCodes.OK).json(tenantStream);

        }catch(error){
            console.error(error.message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }

    }

    async listTenantStream(req, res){
        try{
            const authUserJwt = req.user;
            const tenantStreamList = await useTenantCase.listTenantStream(authUserJwt)
            return res.status(StatusCodes.OK).json(tenantStreamList);
        }catch(error){
            console.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    

}

module.exports = new TenantController();
