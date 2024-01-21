const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const shareDocumentUseCase = require('../../domain/usecases/shareDocumentUseCases');
const formHelper = require('../middlewares/helper.form');

class ShareDocument{
    async shareDocument(req, res){
       try{
            const sender_id = req.user.authId;
            const documentData = {...req.body, sender_id: sender_id};

            // Run the form validation middleware
            const validateShareDocumentForm = formHelper.documentShareFormValidator();
            await Promise.all(validateShareDocumentForm.map(validation => validation.run(req)));
            // Check for validation errors
            
            const errors = validationResult(req);
            // console.log("entry", errors)
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            const response = await shareDocumentUseCase.shareDocument(documentData);
            return res.status(StatusCodes.OK).json(response);
       }catch(error){
            console.error(error);
            throw new Error(error.message);
       }
    }

    async fetchAllSharedDocument(req, res){
        // List document shared to a Tenant or Stream(This should appare in the notification screen)
        
    }
}

module.exports = new ShareDocument()



