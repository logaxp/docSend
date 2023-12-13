const { validationResult } = require('express-validator');
const templateUseCase = require('../../domain/usecases/templateUseCases');
const formHelper = require('../../app/middlewares/helper.form');
const { StatusCodes } = require('http-status-codes');
const templateUseCases = require('../../domain/usecases/templateUseCases');
const helper = require('../../app/middlewares/helper')
const dotenv = require('dotenv')

class TemplatesController{

    async createCustomTemplate(req, res){
       try{

            // Run the form validation middleware
            const validateTemplateForm = formHelper.templateFormValidator();
            await Promise.all(validateTemplateForm.map(validation => validation.run(req)));
    
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }


            const authUserJwt = req.user; // Authenticated user jwtData
            const templateData = req.body;
            const newTemplate = await templateUseCases.createTemplate(authUserJwt, templateData)

            res.setHeader('ContentType', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=document.pdf')
            return res.status(StatusCodes.OK).json(newTemplate)
       }catch(error){
            console.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
       }
    }

    async uploadCustomTemplate(req, res){
        // dotenv.config();
        // const storage = process.env.CUSTOM_PDF_TEMPLATE_STORAGE_LOCATION || '/';

        try{

            // Run the form validation middleware
            const validateTemplateUploadForm = formHelper.templateUploadFormValidator();
            await Promise.all(validateTemplateUploadForm.map(validation => validation.run(req)));
    
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            const authUserJwt = req.user;
            const filePath = req.file.destination + '/' + req.file.filename;
            const documentName = req.body.name
            const documentDesc = req.body.description

            // Generate access_token
            const access_token = await helper.cryptoRandomString(20)

            const documentData = {
                user_id: authUserJwt.authId,
                access_token: access_token,
                name: documentName,
                description: documentDesc,
                path: filePath
            }

            const documentResponse = await templateUseCase.uploadCustomTemplate(documentData);

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




    async fitchTenantTemplate(req, res){
        const authUserJwt = req.user;

        try{
            const tenantTemplate = await templateUseCase.fitchAllTenantTemplate(authUserJwt);
            return res.status(StatusCodes.OK).json(tenantTemplate);
        }catch(error){
            console.error(error.message)
        }

    }

}



module.exports = new TemplatesController();

