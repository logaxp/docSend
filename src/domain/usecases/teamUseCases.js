const teamRepository = require("../repositories/teamRepository");
const helper = require('../../app/middlewares/helper');
const db = require('../models/index');
const { 
    User, 
    Team, 
    Documents, 
    TeamDocument, 
    TeamMember
} = db;

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

    async fetchTeams(authId){
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: "ID constraints", status: 404 }
            }
            const response = await teamRepository.fetchTeams(authId);
            return response;
        }catch(error){
            console.error(error);
        }
    }

    async fetchUserTeams(authId){
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: "ID constraints", status: 404 }
            }

            const response = await teamRepository.fetchUserTeams(authId);
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
                return { success: false, msg: 'Document not fund/or Document permission contraints', status: 502 }
            }

            const teamDocument = await TeamDocument.findOne({
                where: { access_token: data.access_token, team_id: team.id, },
                attributes: ["access_token"]
            });
            
            if(!teamDocument){
                const response = await teamRepository.addProjectToTeam(data);
                return response;
            }
            return { success: false, msg: 'Document exist in team', status: 400 }

        }catch(error){
            console.error(error);
        }
    }

    // SEARCH AND ADD STAFF TO TEAM
    async searchAndAddStaffToTeam(tenantId, adminId, keyword){
        try {
            return await teamRepository.searchAndAddStaffToTeam(tenantId, adminId, keyword);
          } catch (error) {
            throw new Error(error);
          }
    }

    async deleteTeam(authId, query){
        /**
         * Removes Team
         **/ 
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: 'Staff ID constraints', status: 404 }
            }

            const team = await Team.findOne({ where: { id: query.team_id, delete: 0 } });
            console.log(team)
            if(!team){
                return { success: false, msg: 'Team ID constraints', status: 404 }
            }

            const response = await teamRepository.deleteTeam(user.id, team.id);
            return response;

        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeamMember(authId, query){
        /**
         * Removes Team
         **/ 
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: 'Staff ID constraints', status: 404 }
            }

            const team = await Team.findOne({ where: { id: query.team_id, delete: 0 } });
            
            if(!team){
                return { success: false, msg: 'Team ID constraints', status: 404 }
            }
            
            if(team.creator_id == query.member_id){
                return { success: false, msg: 'You cann\'t remove yourself from team', status: 502 } // 502 bad request
            }
            const response = await teamRepository.deleteTeamMember(team.id, query.member_id);
            return response;

        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async fetchTeamMembers(authId, teamId){
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: 'Staff ID constraints', status: 404 }
            }
            const isPartOfTeam = await TeamMember.findOne({ where: { team_id: teamId, member_id: user.id } });
            if(!isPartOfTeam){
                return { success: false, msg: 'System violation', status: 502 }
            }
            const response = await teamRepository.fetchTeamMembers(teamId);
            return response;
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async fetchTeamDocument(authId, teamId){
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: 'Staff ID constraints', status: 404 }
            }
            const isPartOfTeam = await TeamDocument.findOne({ where: { team_id: teamId } });
            if(!isPartOfTeam){
                return { success: false, msg: 'System violation', status: 502 }
            }
            const response = await teamRepository.fetchTeamDocument(teamId);
            return response;
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeamProject(authId, query){
        /**
         * Handles the deletetion of Team project
         **/ 
        try{
            const user = await User.findOne({ where: { id: authId } });
            if(!user){
                return { success: false, msg: 'Staff ID constraints', status: 404 }
            }

            const teamDocument = await TeamDocument.findOne({ 
                where: { 
                    access_token: query.access_token
                } 
            });

            if(!teamDocument){
                return { success: false, msg: 'Project not found', status: 404 } // 502 bad request
            }

            const team = await Team.findOne({ 
                where: { 
                    id: teamDocument.team_id, 
                    creator_id: user.id, 
                    delete: 0 
                } 
            });
            
            if(!team){
                return { success: false, msg: 'Team ID constraints', status: 502 }
            }

            const response = await teamRepository.deleteTeamProject(team.id, teamDocument.access_token);
            return response;

        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async updateTeam(body){
        try{
            const user = await User.findOne({where: {id: body.user_id}});
            if(!user){
                return { success: false, msg: "Authentication constaraints", status: 502 }
            }
            const team = await Team.findOne({ where: { id: body.team_id, creator_id: user.id }});
            if(!team){
                return { success: false, msg: "Team ID constaraints", status: 404 } 
            }
            const teamNewName = body.name.trim(); // Remove leading and trailing spaces
            if(helper.capitalize(team.name) == helper.capitalize(teamNewName)){
                return { success: false, msg: "No change was made, try to edit the Team name and save", status: 502 }
            }
            const response = await teamRepository.updateTeam(body.team_id, teamNewName);
            return response;
        }catch(error){
            console.error(error)
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

}

module.exports = new TeamUseCase();

