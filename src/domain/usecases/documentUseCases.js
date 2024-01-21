const db = require('../models/index');
const { PDFDocument, rgb } = require('pdf-lib');
const documentRepository = require('../repositories/documentRepository');
const helper = require('../../app/middlewares/helper');
const fs = require('fs').promises;
const dotenv = require('dotenv');



class DocumentUseCases{

    async fetchSingleTenantDocument(tenantData){
        try{
            const tenantTemplate = await documentRepository.fetchSingleTenantDocument(tenantData);
            return tenantTemplate;
        }catch(error){
            console.log(error);
        }
    }

    async fetchAllTenantDocument(documentData){
        try{
            const tenantDocument = await documentRepository.fetchAllTenantDocument(documentData.authId);
            return tenantDocument;
        }catch(error){
            console.error(error.message)
            return;
        }
    }

    async uploadTenantDocument(documentData) {
        let transaction;
        try {
          // Initialize the transaction using the correct Sequelize instance (e.g., db.rest)
          transaction = await db.rest.transaction();
      
          // Pass document metadata to the use case template
          const document = await documentRepository.uploadTenantDocument(documentData, transaction);
      
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
          await documentRepository.documentNoneCreatorPermission(permissionDataArray, transaction);
      
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

    /**
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

    async updateOne(user_id, requestBody){

        let tenantData;

        dotenv.config();

        console.log(requestBody)

        const filePath = process.env.CUSTOM_PDF_TEMPLATE_STORAGE_LOCATION;
        for(const key in requestBody){
            const data = requestBody[key];
            tenantData = { user_id: user_id, access_token: data.access_token }
        }

        // console.log(tenantData);
        // Fetch document metadata from the db
        const document = await documentRepository.singleTenantDocument(tenantData)

        const pdfUrl = document.path;

        // Use pdf-lib to modify the PDF
        const pdfBytes = await fs.readFile(`${filePath}/${pdfUrl}`);
        const pdfDoc = await PDFDocument.load(pdfBytes);
       
        // Iterate over the data structure
        for (const key in requestBody) {
            const { text, x, y, color, fontSize, width: clientSideWidth, height: clientSideHeight } = requestBody[key];

            // console.log(text, x, y, color, fontSize)

            
            // Check if the item has 'text' property to ensure it's an editable content
            if (text) {
                const firstPage = pdfDoc.getPages()[0];

                // const { width: docWidth, height: docHeight } = await helper.adjustServerSideDimensions(clientSideWidth, clientSideHeight, firstPage.getSize().width, firstPage.getSize().height)
                
                // Dynamically set the position based on the editableContent position in points
                const { x: pointsX, y: pointsY } = await helper.pixelsToPoints({ x, y });
                
                // Get dynamic color
                const fontColor = await helper.hexToRgb(color);

                // console.log('Page height:', docHeight)
                
                firstPage.setLineHeight(0);
                firstPage.setFontSize(fontSize - 4.3);
                firstPage.setFontColor(rgb(fontColor.red, fontColor.green, fontColor.blue))
                
                
                const yPosition = firstPage.getSize().height - pointsY;
                console.log('y', yPosition.toFixed(0));

                firstPage.drawText(`${text}`, {
                    x: pointsX - 10.5,
                    y: yPosition, // Invert Y-axis for correct positioning
                });
            }
        }

        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();

        return await fs.writeFile(`${filePath}/${pdfUrl}`, modifiedPdfBytes);
    }

    async searchDocument(userId, keyword){
        try {
            return await documentRepository.searchDocument(userId, keyword)
          } catch (error) {
            throw new Error(error);
          }
    }

    async deleteDocument(userId, documentId){
        try{
            return await documentRepository.deleteDocument(userId, documentId)
        }catch(error){
            console.error(error)
            throw new Error('There was an error deleting document');
        }
    }

}

module.exports = new DocumentUseCases();
