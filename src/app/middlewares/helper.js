require('dotenv').config();
const randString = require('randomstring');
const jwt = require('jsonwebtoken');

module.exports = {
    emailValidator: async (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if(emailRegex){
            return true;
        }else{
            return false;
        }
    },

    generateVerificationCode: async () => {
        const response = randString.generate({length: 6, charset: ['numeric']});
        return response;
    },

    createJWT: async (id, email) => {
        return jwt.sign({userId: id, email: email}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_TIME})
    },

    verifyJWT: async (token, secretkey) => {
        return jwt.verify(token, secretkey);
    }
}



