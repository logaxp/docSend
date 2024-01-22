const { StatusCodes } = require('http-status-codes');
const documentUseCase = require('../../domain/usecases/documentUseCases');
const { validationResult } = require('express-validator');
const formHelper = require('../../app/middlewares/helper.form');
const helper = require('../../app/middlewares/helper');
const path = require('path');

class DocumentController{

    async fetchSingleTenantDocument(req, res){
        const documentId = req.params.documentId;
        const authUserJwt = req.user;

        const tenantData = { 
            access_token: documentId, 
            user_id: authUserJwt.authId 
        }

        try{
            const tenantDocument = await documentUseCase.fetchSingleTenantDocument(tenantData)
            return res.status(StatusCodes.OK).json(tenantDocument)
        }catch(error){
            console.log(error);
        }

    }

    async uploadTenantDocument(req, res){
        // dotenv.config();

        try{

            // Run the form validation middleware
            const validateTemplateUploadForm = formHelper.documentUploadFormValidator();
            await Promise.all(validateTemplateUploadForm.map(validation => validation.run(req)));
    
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            const authUserJwt = req.user;
            const filePath = 'pdf/'+req.file.filename //req.file.destination + '/' + req.file.filename;
            const documentName = req.body.name
            const documentDesc = req.body.description

            // Generate access_token
            const access_token = await helper.cryptoRandomString(20)

            const documentData = {
                creator_id: authUserJwt.authId,
                user_id: authUserJwt.authId,
                access_token: access_token,
                name: documentName,
                description: documentDesc,
                path: filePath
            }

            const documentResponse = await documentUseCase.uploadTenantDocument(documentData);

            if(!documentResponse){
                return res.status(StatusCodes.CREATED).json({
                    msg: "Template uploaded failed!",
                    status: StatusCodes.INTERNAL_SERVER_ERROR
                });
            }
            return res.status(StatusCodes.CREATED).json({
                msg: "Template uploaded successfully!",
                document: documentResponse,
                status: StatusCodes.CREATED
            });
            
        }catch(error){
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: 'Internal Server Error',
                error: error.message,
                status: StatusCodes.INTERNAL_SERVER_ERROR
            })
        }
    }

    async updateDocument(req, res){
        try{
            const requestBody = req.body;
            const user_id = req.user.authId;
            // const reqBody = { ...requestBody, user_id: req.user.authId }
            const response = await documentUseCase.updateOne(user_id, requestBody);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
        }
    }

    async fetchAllTenantDocument(req, res){
        const authUserJwt = req.user;
        try{
            const tenantDocument = await documentUseCase.fetchAllTenantDocument(authUserJwt);
            return res.status(StatusCodes.OK).json(tenantDocument);
        }catch(error){
            console.error(error)
        }
    }

    async searchDocument(req, res){
        try{
            // Return all document created by user with search keyword
            const keyword = req.query.keyword;
            const userId = req.user.authId;

            const response = await documentUseCase.searchDocument(userId, keyword)
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
        }
    }

    async deleteDocument(req, res){
        const documentId = req.params.id;
        const userId = req.user.authId;

        const response = await documentUseCase.deleteDocument(userId, documentId);
        return res.status(StatusCodes.OK).json(response);

    }

}

module.exports = new DocumentController();



