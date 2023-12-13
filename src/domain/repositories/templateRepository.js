const db = require('../models/index');
const { Template, User, Documents } = db;


class TemplatesRepository{

    async createTemplate(templateData, transaction){
        return await Template.create(templateData, transaction);
    }

    async uploadCustomTemplate(documentData, transaction){
        return await Documents.create(documentData, transaction);
    }

    async fitchAllTenantTemplate(id){
        return await Template.findAll({where: {user_id: id}});
    }

    // async fetchOneT

}

module.exports = new TemplatesRepository();
