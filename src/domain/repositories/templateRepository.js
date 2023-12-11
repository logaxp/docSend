const db = require('../models/index');
const { Template, User } = db;


class TemplatesRepository{

    async createTemplate(templateData, transaction){
        return await Template.create(templateData, transaction);
    }

}

module.exports = new TemplatesRepository();
