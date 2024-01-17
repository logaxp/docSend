const { body, matchedData, validationResult } = require('express-validator');
const db = require('../../domain/models/index');
const { Op } = require('sequelize');
const { User, Template } = db;
const {upload} = require('../middlewares/helper.file.upload')



const signupValidation = () => {
    return [
        body('firstname').notEmpty()
        .withMessage('First name is required')
        .isLength({min: 2}).withMessage('Minimum first name character must be 2'),
        body('lastname').notEmpty()
        .withMessage('Last name is required')
        .isLength({min: 2}).withMessage('Minimum last name character must be 2'),
        body('email').isEmail().withMessage('Invalid email format')
        .custom((value, {req}) => {
            return User.findOne({
                where: {email: req.body.email},
                attributes: ["id", "email"],
            }).then((user) => {
                if(user){
                    return Promise.reject("Email is already in use, Please try another one!");
                }
                return Promise.resolve()
            });
        }),
        body('phone_no').optional().isMobilePhone().withMessage('Invalid phone number format'),
        body('password').isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((value, {req}) => {
            if(req.body.confirm_password != req.body.password){
                return Promise.reject("Confirm password miss match, Confirm password must be equal to Password!");
            }
            return Promise.resolve()
        }),
        // body('type').notEmpty().withMessage('User type is required'),
        // body('tenant_name').notEmpty().withMessage('Tenant name is required'),
      ];
}

const loginFormValidator = () => {
    return [
        body('email').notEmpty().withMessage('Email field is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password field is required'),
    ];
}

const streamFormValidator = () => {
    return [
        body('firstname').notEmpty().withMessage('First name is required'),
        body('lastname').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email format')
        .custom((value, {req}) => {
            return User.findOne({
                where: {email: req.body.email},
                attributes: ["id", "email"],
            }).then((user) => {
                if(user){
                    return Promise.reject("Email is already in use, Please try another one!");
                }
            });
        }),
        body('phone_no').optional().isMobilePhone().withMessage('Invalid phone number format'),
    ]
}

const templateFormValidator = () => {
    return [
        body('name').notEmpty().withMessage('Template name is required')
        .custom((value, {req}) => {
            // Check if a the template name is already to the creator.
            return Template.findOne({
                where: {
                    user_id: req.user.authId,
                    name: {
                        [Op.notIn]: [req.body.name]
                    }
                }
            }).then((template) => {
                if(template){
                    return Promise.reject('Template name already exist, Please try another name!')
                }
            });
        }),
        body('content').notEmpty().withMessage('Content is required')
    ];
}

const documentUploadFormValidator = () =>{
    return [
        body('name').notEmpty().withMessage('Please enter a Template name'),
        body('document').custom((value, { req }) => {
            if(!req.file){
                return Promise.reject('Please select a document template file')
            }
            return Promise.resolve();
        }),
    ];
}

const isEmailVerified = (OTPEmail) => {
    // checks if an email as been verified or not
    return User.findOne({
            where: {
                [Op.and]: { email: OTPEmail, status: 1 }
            }
        }).then((isVerified) => {
            if(isVerified){
                return true;
            }
            return false;
        });
}


module.exports = {
    signupValidation,
    loginFormValidator,
    streamFormValidator,
    templateFormValidator,
    documentUploadFormValidator,
    isEmailVerified
}

