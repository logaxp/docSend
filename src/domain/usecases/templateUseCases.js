const db = require('../models/index')
const { User, DocumentPermissions, Documents } = db;
const templatesRepository = require('../repositories/templateRepository');
const generatorHelper = require('../../app/middlewares/helper.generator');
const helper = require('../../app/middlewares/helper');
const documentPermissionHelper = require('../../app/middlewares/helper.document.permission');
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

    async uploadCustomTemplate(documentData) {
        let transaction;
        try {
          // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
          transaction = await db.rest.transaction();
      
          // Pass document metadata to the use case template
          const document = await templatesRepository.uploadCustomTemplate(documentData, transaction);
      
          // Set document permissions for the creator
          const permissionDataArray = [
            {
              user_id: documentData.user_id,
              document_id: document.id,
              can_view: 1,
              can_edit: 1,
              can_delete: 1,
              can_share: 1,
              can_download: 1,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ];
      
          // Pass document permissions to the repository template
          await templatesRepository.documentNoneCreatorPermission(permissionDataArray, transaction);
      
          // Save doc template data
          await transaction.commit();
      
          return document;
        } catch (error) {
          await transaction.rollback();
          console.error('Error: ', error);
          await helper.removeUploadedFile(documentData.path, documentData.name);
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
    
/**
 *
 *
 * @param {*} permissionData
 * @return {*} 
 * @memberof TemplatesUseCase
 */
async setDocumentNoneCreatorPermission(permissionData){
        
        const models = [
            { 
                userModel: User,
                documentModel: Documents,
                permissionModel: DocumentPermissions 
            }
        ];

        const permissionDataArray = permissionData.map(intity => ({
            user_id: intity.user_id,
            document_id: intity.document_id,
            can_view: 1,
            can_edit: 0,
            can_delete: 0,
            can_share: 0,
            can_download: 0,
            created_at: new Date(),
            updated_at: new Date(),
        }));


        try{

            // validate permission requestData
            // const validatorResponse = 
            await documentPermissionHelper.validateDocumentPermission(permissionData, models);
            // if(!validatorResponse){
            //     // Write to log file
            //     return validatorResponse;
            // }

            // Check existing permissions
            const existingPermissions = await DocumentPermissions.findAll({
                where: {
                user_id: { [Op.in]: permissionDataArray.map(intity => intity.user_id) },
                document_id: { [Op.in]: permissionDataArray.map(intity => intity.document_id) }
                }
            });


            // Filter out permissionDataArray entries that already exist
            const newPermissions = permissionDataArray.filter(permissionData => {
                return !existingPermissions.some(existingPermission =>
                existingPermission.user_id === permissionData.user_id &&
                existingPermission.document_id === permissionData.document_id
                );
            });

            const setPermission = await templatesRepository.documentNoneCreatorPermission(newPermissions)
            return setPermission;

        }catch(error){
            console.error(error.message)
            return;
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
