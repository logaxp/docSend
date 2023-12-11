const { validationResult } = require('express-validator');
const templateUseCase = require('../../domain/usecases/templateUseCases');
const formHelper = require('../../app/middlewares/helper.form');
const { StatusCodes } = require('http-status-codes');
const templateUseCases = require('../../domain/usecases/templateUseCases');
const {parse, stringify, toJSON, fromJSON} = require('flatted');

class TemplatesController{

    async createTemplate(req, res){
       try{

        // console.log(req.body)
            // Run the form validation middleware
            const validateTemplateForm = formHelper.templateFormValidator();
            await Promise.all(validateTemplateForm.map(validation => validation.run(req)));
    
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }
            const templateData = req.body;
            const newTemplate = await templateUseCases.createTemplate(templateData)
            // console.log(typeof newTemplate)

            res.setHeader('ContentType', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=document.pdf')
            // const template = stringify(newTemplate)
            // console.log(newTemplate);
            return res.status(StatusCodes.OK).json(newTemplate)
       }catch(error){
            console.error(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
       }
    }

}



module.exports = new TemplatesController();

