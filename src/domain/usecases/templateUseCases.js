const db = require('../models/index')
const { User } = db;
const templatesRepository = require('../repositories/templateRepository');
const generatorHelper = require('../../app/middlewares/helper.generator');
const helper = require('../../app/middlewares/helper')
const searchHelper = require('../../app/middlewares/helper.search')
const {StatusCodes} = require('http-status-codes');
const { Op } = require('sequelize');

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

    async searchTenantStream(searchData, authUserJwt){
        try{


            const user = await User.findOne({
                where: {id: authUserJwt.authId}
            })

            if(!user){
                return console.error(user)
            }

            // use advanced search middleware
            const whereClause = await searchHelper.advanceTenantStreamSearch(searchData, user.tenant_id);

            // send advance search pattern to the repository.
            const queryResponse = await templatesRepository.searchTenantStream(whereClause)
            return queryResponse;

        }catch(error){
            console.error(error.message)
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
