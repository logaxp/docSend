


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
                return Promise.reject('Invalid user id or document id or permission id detected. Transaction aborted.');
             }
             return Promise.resolve();

        }catch(error){
            console.error(error);
            return;
        }
    },
    // preventDocumentPermissionDuplicate: async () => {

    // },
}






