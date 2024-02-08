const teamUseCase = require('../../domain/usecases/teamUseCases');
const { validationResult } = require('express-validator');
const formHelper = require('../middlewares/helper.form');
const { StatusCodes } = require('http-status-codes');
const relationshipHelper = require('../middlewares/helper.relationship');

class TeamController{
    async createTeam(req, res){
        try{

            // Run the form validation middleware
            const validateTeamForm = formHelper.validateTeamCreationForm();
            await Promise.all(validateTeamForm.map(validation => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            const teamData = { name: req.body.name, creator_id: req.user.authId }
            const response = await teamUseCase.createTeam(teamData);
            if(response.isNewRecord === false){
                return res.status(StatusCodes.CREATED).json({
                    msg: 'Team created successfully'
                });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: 'Team created was not successful'
            });

        }catch(error){
            console.error(error)
        }
    }

    async addTeamMember(req, res){
        try {

            const teamId = req.body[0].team_id;
            const payload = req.body;

            // Validate staff email
            const isValid = await formHelper.validateTeamMemberEmails(payload);

            if (isValid.length > 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: isValid[0],
                });
            }
            
            // pass payload to the the use case object
            const response = await teamUseCase.addTeamMember(req.user.authId, teamId, req.body);
            return res.status(StatusCodes.CREATED).json(response);
        
        } catch (error) {
            console.error('An error occurred:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: 'Internal Server Error',
            });
        }        
    }

    async getTenantStaffs(req, res) {
        try{
            // pass payload to the the use case object
            const response = await teamUseCase.getTenantStaffs(req.user.authId);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
        }
    }

    // IN THIS CONTEXT THE METHOD CONJUNCTION IN THE NAME Project means document.
    async addProjectToTeam(req, res){
        try{
            // pass payload to the the use case object
            const response = await teamUseCase.addProjectToTeam(req.user.authId, req.body);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
        }
    }

    // SEARCH AND ADD STAFF TO TEAM
    async searchAndAddStaffToTeam(req, res){
        try{
            const keyword = req.query.keyword;
            const adminId = req.user.authId;

            
            const relationship = await relationshipHelper.tenantRelationship(adminId);
            if(!relationship){
                return res.status(StatusCodes.NOT_FOUND).json({msg: 'Tenant not found'})
            }
            const response = await userUseCases.searchAndAddStaffToTeam(relationship.tenant_id, adminId, keyword)
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = new TeamController();
