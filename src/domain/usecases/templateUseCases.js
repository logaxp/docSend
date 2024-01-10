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
              creator_id: documentData.creator_id,
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
 * @param {*
 *  Contains users permission data to be save in the database
 * } permissionData
 * @return {
 *  return instance of Permission 
 * } 
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

        try{

            // Current user jwt data
            const authUserJwt = permissionData.user

            
            const creator = await User.findOne({
                where: { id: authUserJwt.authId }
            });

            if(!creator){
                return;
            }

            const requestData = { ...permissionData.body, creator_id: creator.id };

            // Check if creator shares tenant relatioship with user
            if(creator.tenant_id !== requestData.tenant_id){
                console.error('Tenant relationship miss match, permission creation failed')
                // return  'Tenant relationship miss match';
                return false;
            }

            const response = await documentPermissionHelper.validateDocumentPermission([requestData], models);
            if(!response){
                false;
            }
            
            const model = DocumentPermissions;
            const isPermissionSet = await documentPermissionHelper.preventDocumentPermissionDuplicate(requestData, model);
            
            if(isPermissionSet === false){
                // if user has permission set for document in context return
                // sendback this message.
                return 'User already has permission to this document.'
            }
            const setPermission = await templatesRepository.documentNoneCreatorPermission([requestData])
            return setPermission;

        }catch(error){
            console.error(error.message)
            return;
        }
    }

    async updateDocumentNoneCreatorPermission(updateData){

        const authUserJwt = updateData.user;
        const _updateData = updateData.body;

        const models = [
            { 
                userModel: User,
                documentModel: Documents,
                permissionModel: DocumentPermissions 
            }
        ];

        try{
            
            // Check if creator shares tenant relatioship with user
            const creator = await User.findOne({
                where: { id: authUserJwt.authId }
            });

            if(!creator){
                console.error('You\'re not the creator of the document')
                return false;
            } 


            const newUpdateDataClone = { ..._updateData, creator_id: creator.id };

            if(creator.tenant_id !== _updateData.tenant_id){
                console.error('Tenant relationship miss match, permission update failed')
                // return  'Tenant relationship miss match';
                return false;
            }

            const response = await documentPermissionHelper.validateDocumentPermission([newUpdateDataClone], models);
            if(!response){
                false;
            }

            // console.log(newUpdateDataClone)

            const model = DocumentPermissions;
            const isPermissionSet = await documentPermissionHelper.preventDocumentPermissionDuplicate(newUpdateDataClone, model);
            
            if(isPermissionSet === true){
                // if user has permission set for document in context return
                // sendback this message.
                return 'Document or User doesn\'t exist.'
            }

            // If pass send payload to templateRepository template
            const setNewPermission = await templatesRepository.updateNoneDocumentCreatorPermission(newUpdateDataClone)
            return setNewPermission;

        }catch(error){
            console.error(error)
        }
    }

    async fitchAllTenantTemplate(tenantData){
        try{
            const tenantTemplate = await templatesRepository.fitchAllTenantTemplate(tenantData.authId);
            return tenantTemplate;
        }catch(error){
            console.error(error.message)
            return;
        }
    }

    async fetchSingleTenantDocument(tenantData){
        try{
            const tenantTemplate = await templatesRepository.singleTenantDocument(tenantData);
            return tenantTemplate;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new TemplatesUseCase();
