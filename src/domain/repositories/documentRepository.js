const { Op } = require('sequelize');
const db = require('../models/index');
const { 
    Template, 
    User, 
    Documents,
    DocumentPermissions
} = db;



class DocumentRepository{

    async singleTenantDocument(tenantData){
        return await Documents.findOne({
            where: {
                user_id: tenantData.user_id, 
                access_token: tenantData.access_token
            }});
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
        return await Documents.findAll({where: {user_id: id}});
    }

    async update(){

    }
}

module.exports = new DocumentRepository();
