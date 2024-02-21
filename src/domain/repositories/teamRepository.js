const { Op } = require('sequelize');
const db = require('../models/index');
const { translate } = require('pdf-lib');
const helper = require('../../app/middlewares/helper');
const { Team, User, TeamMember, TeamDocument, Documents } = db;

class TeamRepository{

    async createTeam(teamData){
        // Create Team
        let transaction;

        try{
            transaction = await db.rest.transaction();
            
            const response = await Team.create(teamData, { transaction });
            await TeamMember.create({ team_id: response.id, member_id: teamData.creator_id }, { transaction })
            await transaction.commit();
            return response;
        }catch(error){
            console.log(error)
            await transaction.rollback();
            return { success: false, msg: 'Internal Server Error', status: 500 }
        }
    }

    async fetchOneTeam(teamId){
        /*
        * Return a single team
        */

        try{
            const result = await Team.findOne({ 
                where: { id: teamId }
            });
            if(result.length < 1){
                return { success: false, msg: "Record not found", status: 404 }
            }
            return result;
        }catch(error){
            console.log(error)
        }

    }

    async fetchTeams(authId){
        try{
            const result = await Team.findAll({ where: { creator_id: authId, delete: 0 } });
            console.log(authId)
            if(result.length < 1){
                return { success: false, msg: "You're yet to creat a Team", status: 404 }
            }
            return result;
        }catch(error){
            console.error(`There was an error retrieving Team record`, error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async fetchUserTeams(authId){
        try{
            const res = await TeamMember.findOne({ where: { member_id: authId } });

            if(!res.length < 1){
                return { success: false, msg: "ID contraints", status: 404 }
            }

            const result = await Team.findAll({ where: { id: res.team_id, delete: 0 } });
            if(result.length < 1){
                return { success: false, msg: "You're not member of a Team yet", status: 404 }
            }
            return result;
        }catch(error){
            console.error(`There was an error retrieving Team record`, error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async addTeamMember(teamId, tenantId, memberData){

        const promises = memberData.map(async (members) => {
        try {
            const member = await User.findOne({
                where: { email: members.email, tenant_id: tenantId },
                attributes: ['id']
            });

            if (!member) {
                return { success: false, msg: "Staff not found", status: 404 };
            }

            // Check if staff is among the team
            const isAmong = await TeamMember.findOne({ where: { team_id: teamId, member_id: member.id } })
            if(!isAmong){
                await TeamMember.create({ team_id: teamId, member_id: member.id });
                return { success: true, msg: "Member(s) added successfully", status: 201 };
            }
            return { 
                success: false, 
                msg: "Some Staff are already part of the team and were skiped", 
                status: 400
            }

            

        } catch(error) {
            console.error(`Error processing member with email ${members.email}:`, error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    });

    // Wait for all promises to resolve using Promise.all
    const results = await Promise.all(promises);
    return results[0]; // Return the results array

    }

    async getTenantStaffs(authId, tenantId) {
        try {
            const result = await User.findAll({
                where: {
                    tenant_id: tenantId,
                    id: { [Op.ne]: authId } // Exclude the current logged-in user by their id
                },
                attributes: ['id', 'firstname', 'lastname', 'email']
            });
        
            if (result.length === 0) {
                return { success: false, msg: "You're yet to add a staff to your Tenant", status: 404 };
            }
        
            return result;
        } catch (error) {
            console.error(error);
        }
    } 

    async addProjectToTeam(teamDocumentData){
        try{
            const result = await TeamDocument.create(teamDocumentData);
            if(result.isNewRecord == false){
                return { success: true, msg: "Project added successfully", status: 201 }
            }
            return { success: true, msg: "Project creation process failed", status: 500 }
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }

    }

    // SEARCH AND ADD STAFF TO TEAM
    async searchAndAddStaffToTeam(tenantId, adminId, keyword){
        try {
            return await User.findAll({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { firstname: { [Op.like]: `%${keyword}%` } },
                        { lastname: { [Op.like]: `%${keyword}%` } },
                        { email: { [Op.like]: `%${keyword}%` } },
                        { phone_no: { [Op.like]: `%${keyword}%` } },
                      ]
                    },
                    { tenant_id: tenantId },
                    { id: { [Op.ne]: adminId } } // Exclude the current user
                  ]
                },
                attributes: ["id", "firstname", "lastname", "email"]
              });
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
    }

    async deleteTeam(teamId,){
        let transaction;

        try{
            transaction = await db.rest.transaction();
            const delTeam = await Team.destroy({where: { id: teamId, creator_id: authId }}, { transaction });
            await TeamMember.destroy({ where: {team_id: teamId }}, { transaction });
            
            if(delTeam < 1){
                return { success: false, msg: "System failed while trying to process request", status: 404}
            }

            await transaction.commit();
            return { success: true, msg: "Team removed successfully", status: 200 }
        }catch(error){
            await transaction.rollback();
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async deleteTeamMember(teamId, memberId){

        try{
            const user = await User.findOne({ where: { id: memberId } });
            if(!user){
                return { success: false, msg: "Team member ID constraints", status: 404 }
            }
            const delTeamMember = await TeamMember.destroy({ where: {team_id: teamId, member_id: memberId }});
            
            if(delTeamMember < 1){
                return { success: false, msg: "System failed while trying to process request", status: 404}
            }

            return { success: true, msg: `${user.firstname + ' ' + user.lastname} was removed from team successfully`, status: 200 }
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async fetchTeamMembers(teamId){
        try {
            const result = await TeamMember.findAll({ where: { team_id: teamId } })
            if (result.length < 1) {
                return { success: false, msg: "There are no members in the Team", status: 404 }
            }
        
            const res = await Promise.all(result.map(async (member) => {
                const { member_id } = member;
                const user = await User.findAll({
                    where: { id: member_id },
                    attributes: ["id", "firstname", "lastname", "email"]
                });
                return user[0];
            }));
        
            return res;
        } catch (error) {
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
        
    }

    async fetchTeamDocument(teamId){
        try {
            const result = await TeamDocument.findAll({ where: { team_id: teamId } })
            if (result.length < 1) {
                return { success: false, msg: "There are no members in the Team", status: 404 }
            }
        
            const res = await Promise.all(result.map(async (teamDocument) => {
                const { access_token } = teamDocument;
                const document = await Documents.findAll({
                    where: { access_token: access_token },
                    // attributes: ["firstname", "lastname", "email"]
                });
                return document[0];
            }));
        
            return res;
        } catch (error) {
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
        
    }

    async deleteTeamProject(teamId, accessToken){
        try{
            const result = await TeamDocument.destroy({ 
                where: {team_id: teamId, access_token: accessToken }
            });
            
            if(result < 1){
                return { 
                    success: false, 
                    msg: "System failed while trying to process request", 
                    status: 404
                }
            }

            return { success: true, msg: "Project removed successfully", status: 200 }
        }catch(error){
            console.error(error);
            return { success: false, msg: "Internal Server Error", status: 500 }
        }
    }

    async updateTeam(teamId, name){
        try {

            // Perform the update
            const [affectedRowsCount, affectedRows] = await Team.update(
                { name:  name },
                { where: { id: teamId } }
            );
        
            if (affectedRowsCount > 0) {
                // Return the updated rows
                return { success: true, msg: `Team name was changed successfully`, status: 200 };
            } else {
                // Handle case where no rows were updated
                return { success: false, msg: "No matching record found", status: 404 };
            }
        } catch (error) {
            console.error("Error updating team:", error);
            return { success: false, msg: "Internal Server Error", status: 500 };
        }
        
    }

}

module.exports = new TeamRepository();
