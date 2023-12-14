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

    async uploadCustomTemplate(documentData, transaction){
        /*
        *   Create and return uploaded document instance metadata
        */
        return await Documents.create(documentData, transaction);
    }

    async documentCreatorPermission(permissionDataArray, transaction){
        /*
        *   Give all permission previllages to creator
        */
        
        const permissions = await Promise.all(permissionDataArray.map(permissionData => {
            return DocumentPermissions.create(permissionData, { transaction });
          }));
        
          return permissions;
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

    // async fetchOneT

}

module.exports = new TemplatesRepository();
