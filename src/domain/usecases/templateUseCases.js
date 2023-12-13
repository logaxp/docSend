const db = require('../models/index')
const { User } = db;
const templatesRepository = require('../repositories/templateRepository');
const generatorHelper = require('../../app/middlewares/helper.generator');
const helper = require('../../app/middlewares/helper')
const {StatusCodes} = require('http-status-codes')

class TemplatesUseCase {
    async createTemplate(authUserJwt, templateData) {
        let transaction;
        try {

            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();

            const user = await User.findOne({where: {id: authUserJwt.authId}});

            if(!user){
                return 
            }
            
            // clone and append user id to new template data to be save in the database.
            const newTemplateData = { ...templateData, user_id: user.id }

            // Send doc data to the database
            const doc = templatesRepository.createTemplate(newTemplateData, transaction);

            // save doc template data
            await transaction.commit()

            // Generate PDF template
            await generatorHelper.pdfTemplateGenerator(templateData.name, templateData.content)
            
            return doc;
            
           
        } catch (error) {
            await transaction.rollback();
            console.error('Error: ', error.message);
            throw error;
        }
    }

    async uploadCustomTemplate(documentData){
        let transaction;
        try{

            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();
            const document = await templatesRepository.uploadCustomTemplate(documentData, transaction)
            
            // save doc template data
            await transaction.commit()

            return document;

        }catch(error){
            await transaction.rollback();
            console.error('Error: ', error)
            await helper.removeUploadedFile(documentData.path, documentData.name)
            return false;
        }
    }

    async fitchAllTenantTemplate(tenantData){
        try{
            const tenantTemplate = await templatesRepository.fitchAllTenantTemplate(tenantData.authId);
            return tenantTemplate;
        }catch(error){
            console.error('Error: ', error.message)
        }
    }
}

module.exports = new TemplatesUseCase();
