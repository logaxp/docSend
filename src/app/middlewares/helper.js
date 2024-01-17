const dotenv = require('dotenv')
const randString = require('randomstring');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const path = require('path');
const fs = require('fs')

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

    createJWT: async (id, email, tenant_id) => {
        try {
            // Create a JWT token with user ID and email
            const token = jwt.sign({ authId: id, email: email, tenantId: tenant_id }, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_TIME
            });
    
            // Return the generated token
            return token;
        } catch (error) {
            // Handle any errors during token creation
            throw new Error('Error creating JWT');
        }
    },

    cryptoRandomString: async (length) => {
        const buffer = crypto.randomBytes(Math.ceil(length/2));
        const randomString = buffer.toString('hex').slice(0, length);
        return randomString;
    },

    removeUploadedFile: async (filePathToDelete) => {

        try{
            // check file exist in the path(directory)
            fs.access(filePathToDelete, fs.constants.F_OK, (fileError) => {
                if(fileError){
                    return console.error(fileError.message);
                }else{
                    fs.unlink(filePathToDelete, (unlinkError) => {
                        if(unlinkError){
                            return console.error(unlinkError.message);
                        }
                        return true;
                    })
                }
            })
        }catch(error){
            console.log(error)
        }

    },

    createNewUserFolder: async (folder_name) => {
        const userFolderPath = path.join(__dirname, 'user_doc', folder_name)

        // Create the folder if it doesn't exist
        if(!fs.existsSync(userFolderPath)){
            fs.mkdirSync(userFolderPath);
        }

        return userFolderPath;
    },

    pixelsToPoints: async (pixels, dpi = 96) => {
        const inchesX = pixels.x / dpi;
        const inchesY = pixels.y / dpi;
        const pointsX = inchesX * (72 / 1.1); // 1 inch = 72 points
        const pointsY = inchesY * (72 / 1.1); // 1 inch = 72 points
        return { x: pointsX, y: pointsY };
    },

    hexToRgb: async (hex) => {
        // Remove the hash if present
        hex = hex.replace(/^#/, '');
      
        // Parse the hex value
        const bigint = parseInt(hex, 16);
      
        // Extract the RGB components
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
    
        // modify from 0-255 to 0-1
        const red = Number((r/255).toFixed(1));
        const green = Number((g/255).toFixed(1));
        const blue = Number((b/255).toFixed(1));
      
        // Return the RGB values as an object
        return { red, green, blue };
      }
}



