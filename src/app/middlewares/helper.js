const dotenv = require('dotenv')
const randString = require('randomstring');
const jwt = require('jsonwebtoken');

dotenv.config();

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

    generatePassword: async (prefix) => {
        const response = randString.generate({length: 3, charset: ['numeric']});
        const password = prefix+response;
        return password;
    },

    createJWT: async (id, email) => {
        try {
            // Create a JWT token with user ID and email
            const token = jwt.sign({ authId: id, email: email }, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_TIME
            });
    
            // Return the generated token
            return token;
        } catch (error) {
            // Handle any errors during token creation
            throw new Error('Error creating JWT');
        }
    },
}



