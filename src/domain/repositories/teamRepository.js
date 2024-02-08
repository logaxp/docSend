const { Op } = require('sequelize');
const db = require('../models/index');
const { Team, User, TeamMember, TeamDocument } = db;

class TeamRepository{

    async createTeam(teamData){
        // Create Team
        try{
            const response = await Team.create(teamData);
            return response;
        }catch(error){
            console.log(error)
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
                }
              });
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
    }

}

module.exports = new TeamRepository();
