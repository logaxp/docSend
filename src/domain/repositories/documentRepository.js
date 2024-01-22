const { Op } = require('sequelize');
const db = require('../models/index');
const { 
    Template, 
    User, 
    Documents,
    DocumentPermissions
} = db;



class DocumentRepository{

    async fetchSingleTenantDocument(tenantData){
        const result = await Documents.findOne({
            where: {
                user_id: tenantData.user_id, 
                access_token: tenantData.access_token
            }});

        if(result === null){
            return { success: false, msg: 'Document not found', status: 404};
        }
        return result;
    }

    async uploadTenantDocument(documentData, transaction){
        /*
        *   Create and return uploaded document instance metadata
        */
        return await Documents.create(documentData, transaction);
    }

    async setDocumentCreatorPermission(permissionDataArray, transaction){
        /*
        *   Give all permission previllages to creator
        */
        
        const permissions = await Promise.all(permissionDataArray.map(permissionData => {
            return DocumentPermissions.create(permissionData, { transaction });
          }));
        
          return permissions;
    }

    async documentNoneCreatorPermission(permissionDataArray, transaction){
        /*
        *   Give permission previllages to creator
        */
        
        const permissions = await Promise.all(permissionDataArray.map(permissionData => {
            return DocumentPermissions.create(permissionData, { transaction });
          }));
        
          return permissions;
    }

    async fetchAllTenantDocument(id){
        /*
        *   Checks and return multiple template instances
        *   document creator id(user_id) matches the logged in user id
        */
        return await Documents.findAll({
            where: { user_id: id },
            order: [['createdAt', 'ASC']],
          });
          
    }

    async searchDocument(userId, keyword){
        try {
            const result = await Documents.findAll({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { name: { [Op.like]: `%${keyword}%` } }
                      ]
                    },
                    { user_id:  userId }
                  ]
                }
            });

            if(result.length < 1){
                return { success: false, msg: 'No document with search keyword', status: 404}
            }
            return result;
            
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
    }

    async deleteDocument(userId, documentId){
        try{
            const result = await Documents.destroy({
                where: {id: documentId, user_id: userId}
            });
            if(result === 0){
                return { success: false, msg: 'It seems that decument has been removed or doesn\'t exist' }
            }
            return { success: true, msg: 'Document was deleted successfully' }

        }catch(error){
            console.error(error)
        }
    }

    async update(){

    }
}

module.exports = new DocumentRepository();
