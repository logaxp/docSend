const { body, matchedData, validationResult } = require('express-validator');
const db = require('../../domain/models/index');
const { User } = db;



const signupValidation = () => {
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
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('type').notEmpty().withMessage('User type is required'),
        body('tenant_name').notEmpty().withMessage('Tenant name is required'),
      ];
}

const loginFormValidator = () => {
    return [
        body('email').notEmpty().withMessage('Email field is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password field is required'),
    ];
}



// validateTenantForm = [
//     body('firstname').notEmpty().withMessage('First name is required'),
//     body('lastname').notEmpty().withMessage('Last name is required'),
//     body('email').isEmail().withMessage('Invalid email format'),
//     body('phone_no').optional().isMobilePhone().withMessage('Invalid phone number format'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     body('type').notEmpty().withMessage('User type is required'),
//     body('tenant_name').notEmpty().withMessage('Tenant name is required'),
//   ];


module.exports = {
    signupValidation,
    loginFormValidator,
}

