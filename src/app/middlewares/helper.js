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

    validateDocumentPermission: async (requestBody, models) => {
        try{

            const modelObject = models;

            // console.log(modelObject);
            
            // Destructure models data
            const [User] = modelObject.map((model) => model.userModel);
            const [Document] = modelObject.map((model) => model.documentModel);
            const [Permission] = modelObject.map((model) => model.permissionModel);

             // Destructure validate userIds & permissionIds
             const userIds = requestBody.map((user) => user.user_id);
             const documentIds = requestBody.map((permission) => permission.document_id);
             const permissionIds = requestBody.map((permission) => permission.permission_id);

            //  console.log(permissionIds)
            //  return;
 
            //  Validate userIds
             const validateUsers = await User.findAll({
                 where: {id: userIds}
             });
 
            //  Validate documentIds
             const validateDocument = await Document.findOne({
                 where: {id: documentIds}
             });

            //   Validate permissionIds
             const validatePermissions = await Permission.findAll({
                where: {id: permissionIds}
            });

             if(validateUsers.length !== userIds.length 
                || 
                validatePermissions.length !== permissionIds.length
                ||
                !validateDocument){

                return Promise.reject('Invalid user id or document id or permission id detected. Transaction aborted.');
             }
             return Promise.resolve();

        }catch(error){
            console.error(error);
            return;
        }
    },

}



