const { Op } = require('sequelize');
const db = require('../models/index');
const { 
    Template, 
    User, 
    Documents,
    DocumentPermissions
} = db;


class TemplatesRepository{

    async createTemplate(templateData, transaction){
        /*
        *   Create and return user instance
        */ 
        return await Template.create(templateData, transaction);
    }

    // async uploadCustomTemplate(documentData, transaction){
    //     /*
    //     *   Create and return uploaded document instance metadata
    //     */
    //     return await Documents.create(documentData, transaction);
    // }

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


    async updateNoneDocumentCreatorPermission(updateData){
        /** @type {*
         * Update document permission for a user
         * } */
        const updateResponse = await DocumentPermissions.update(
            {
                can_view: updateData.can_view,
                can_edit: updateData.can_edit,
                can_delete: updateData.can_delete,
                can_share: updateData.can_share,
                can_download: updateData.can_download
            },
            { where: {
                [Op.and]: [
                    {user_id: updateData.user_id},
                    {document_id: updateData.document_id}
                ]
            }}
        );
        if(updateResponse.length > 0){
            return true;
        }
        return false;
    }

    async searchTenantStream(whereClause){
        /*
        *   Search and return multiple instances of users
        *   that matches search query
        */
        return await User.findAll({where: whereClause});
    }

    async fitchAllTenantTemplate(id){
        /*
        *   Checks and return multiple template instances
        *   document creator id(user_id) matches the logged in user id
        */
        return await Template.findAll({where: {user_id: id}});
    }

    // async singleTenantDocument(tenantData){
    //     return await Documents.findOne({
    //         where: {
    //             user_id: tenantData.user_id, 
    //             access_token: tenantData.access_token
    //         }});
    // }

}

module.exports = new TemplatesRepository();
