const teamUseCase = require('../../domain/usecases/teamUseCases');
const { validationResult } = require('express-validator');
const formHelper = require('../middlewares/helper.form');
const { StatusCodes } = require('http-status-codes');
const relationshipHelper = require('../middlewares/helper.relationship');
const teamUseCases = require('../../domain/usecases/teamUseCases');
const helper = require('../middlewares/helper');

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

            const teamData = { name: helper.capitalize(req.body.name), creator_id: req.user.authId }
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

    async fetchTeams(req, res){
        /** 
         * Returns the list of Teams created by a user
         */
        try{
            const response = await teamUseCase.fetchTeams(req.user.authId);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
        }
    }

    async fetchUserTeams(req, res){
        /** 
         * Returns the list of Teams a user is member
         */
        try{
            const response = await teamUseCase.fetchUserTeams(req.user.authId);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
        }
    }

async addTeamMember(req, res){
        /** 
         * Handles the adding of users to Team
         */
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
        /**
         * Handle the adding of document(Projects) to a Team
         */
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
        /*
        *   Handles the search of users within a Tenant,
        *   return list of users and allowing team creator to add as team member.
        */ 
        try{
            const keyword = req.query.keyword;
            const adminId = req.user.authId;

            
            const relationship = await relationshipHelper.tenantRelationship(adminId);
            if(!relationship){
                return res.status(StatusCodes.NOT_FOUND).json({msg: 'Tenant not found'})
            }
            const response = await teamUseCase.searchAndAddStaffToTeam(relationship.tenant_id, adminId, keyword)
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeam(req, res){

        /*
        *   Handles the deletetion of Team
        */ 

        try{

            const query = req.query;

            const response = await teamUseCase.deleteTeam(req.user.authId, query);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeamMember(req, res){
        /*
        * Handle the remover of member from a team
        */

        try{
            const query = req.query;
            const response = await teamUseCase.deleteTeamMember(req.user.authId, query);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async fetchTeamMembers(req, res){
        /**
         * Returns the list members of a Team(Group)
         */
        try{
            const response = await teamUseCases.fetchTeamMembers(req.user.authId, req.query.team_id);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async fetchTeamDocument(req, res){
        /**
         * Returns the list of members within a Team(Group)
         */
        try{
            const response = await teamUseCases.fetchTeamDocument(req.user.authId, req.query.team_id);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeamProject(req, res){
        /*
        * Handles the deletetion of Team project
        */
        try{
            const query = req.query;
            const response = await teamUseCase.deleteTeamProject(req.user.authId, query);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async updateTeam(req, res){
        try{
            const reqBody = req.body;
            const authId = req.user.authId;
            const body = { ...reqBody, user_id: authId }
            const response = await teamUseCases.updateTeam(body);
            return res.status(StatusCodes.OK).json(response);
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

}

module.exports = new TeamController();
