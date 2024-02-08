const teamRepository = require("../repositories/teamRepository");
const db = require('../models/index');
const { User, Team, Documents, TeamDocument } = db;

class TeamUseCase{
    async createTeam(teamData){

       try{
            // Get user Tenant ID
            const user = await User.findOne({ where: { id: teamData.creator_id, } });
            if(!user){
                return { success: false, msg: 'ID contraints', status: 400 }
            }

            const team = { ...teamData, tenant_id: user.tenant_id };

            const response = await teamRepository.createTeam(team);
            return response;

       }catch(error){
        console.error(error);
       }
    }

    async addTeamMember(authId, teamId, memberData){
        try{

            // Verify user security
            const user = await User.findOne({ where: { id: authId } });
            const creator = await Team.findOne({ 
                where: { 
                    id: teamId, 
                    creator_id: authId,
                    tenant_id: user.tenant_id
                }});

            if(creator === 0){
                return { success: false, msg: 'Team ownership constraints', status: 400 }
            }

            const response = await teamRepository.addTeamMember(teamId, user.tenant_id, memberData);
            return response;

        }catch(error){
            console.error(error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async getTenantStaffs(authId) {
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: "Initiator not found", status: 404 }
            }
            const response = await teamRepository.getTenantStaffs(authId, user.tenant_id)
            return response;
        }catch(error){
            console.error(error);
        }
    }

    async addProjectToTeam(authId, data){
        try{
            const user = await User.findOne({
                where: { id: authId, },
                attributes: ["id"]
            });
    
            if(!user){
                return { success: false, msg: 'Initiator account not fund', status: 404 }
            }
            const team = await Team.findOne({
                where: { id: data.team_id, creator_id: authId, },
                attributes: ["id"]
            });

            if(!team){
                return { success: false, msg: 'Team permission contraints', status: 404 }
            }
            const document = await Documents.findOne({
                where: { access_token: data.access_token, user_id: user.id, },
                attributes: ["access_token"]
            });
            
            if(!document){
                return { success: false, msg: 'Document not fund', status: 404 }
            }

            const teamDocument = await TeamDocument.findOne({
                where: { access_token: data.access_token, team_id: team.id, },
                attributes: ["access_token"]
            });
            // console.log(teamDocument.id)
            if(!teamDocument){
                const response = await teamRepository.addProjectToTeam(data);
                return response;
            }
            return { success: false, msg: 'Document exist in team', status: 400 }
    
            

        }catch(error){
            console.error(error);
        }
    }

}

module.exports = new TeamUseCase();

