const db = require('../models/index')
const templatesRepository = require('../repositories/templateRepository');
const generatorHelper = require('../../app/middlewares/helper.generator');
class TemplatesUseCase {
    async createTemplate(templateData) {
        let transaction;
        try {

            // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
            transaction = await db.rest.transaction();

            // Send doc data to the database
            const doc = templatesRepository.createTemplate(templateData, transaction);

            await transaction.commit()

            // Generate PDF template
            await generatorHelper.pdfTemplateGenerator(templateData.name, templateData.content)
            
            return doc;
            
           
        } catch (error) {
            console.error('Error: ', error.message);
            throw error;
        }
    }
}

module.exports = new TemplatesUseCase();
