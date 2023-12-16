const { Op } = require("sequelize");



module.exports = {
    validateDocumentPermission: async (requestBody, models) => {
        try{

            // List of models
            const modelObject = models;
            
            // Destructure models data
            const [User] = modelObject.map((model) => model.userModel);
            const [Document] = modelObject.map((model) => model.documentModel);

             // Destructure validate userIds & permissionIds
             const userIds = requestBody.map((user) => user.user_id);
             const tenantIds = requestBody.map((tenant) => tenant.tenant_id);
             const documentIds = requestBody.map((permission) => permission.document_id);
            
 
            //  Validate userIds
             const validateUsers = await User.findAll({
                 where: {id: userIds}
             });
 
            //  Validate documentIds
             const validateDocument = await Document.findOne({
                 where: {id: documentIds}
             });


             if(validateUsers.length !== userIds.length || !validateDocument){
                return false;
                // Promise.reject('Invalid user id or document id or permission id detected. Transaction aborted.');
             }
             return true;
            //  Promise.resolve();

        }catch(error){
            console.error(error);
            return;
        }
    },
    preventDocumentPermissionDuplicate: async (requestBody, model) => {
        // checks if a user already has permission to a specific document
        // if true, terminates new permission initiation else proceed initiate
        const permision = await model.findOne({
            where: {
                [Op.and]: [
                    { user_id: requestBody.user_id },
                    { document_id: requestBody.document_id },
                    { creator_id: requestBody.creator_id }
                ]
            }
        });
        // If document_id and user_id doesn't return an instance
        // then return true else return false
        return permision===null?true:permision.isNewRecord
    },
}






