const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const teamController = require('../controllers/teamController');

router.post('/tenant/team', authMiddleware, teamController.createTeam)
.get('/tenant/team/list', authMiddleware, teamController.fetchTeams)
.patch('/tenant/team/update', authMiddleware, teamController.updateTeam)
.delete('/tenant/team/del', authMiddleware, teamController.deleteTeam)

.get('/tenant/team/staff/list', authMiddleware, teamController.getTenantStaffs)
.post('/tenant/team/add', authMiddleware, teamController.addTeamMember)
.post('/tenant/team/add/project', authMiddleware, teamController.addProjectToTeam)

.get('/tenant/team/project/list', authMiddleware, teamController.fetchTeamDocument)
.delete('/tenant/team/del/project', authMiddleware, teamController.deleteTeamProject)

.get('/tenant/team/staff/search', authMiddleware, teamController.searchAndAddStaffToTeam)
.get('/tenant/team/staff/list', authMiddleware, teamController.fetchUserTeams)

.get('/tenant/team/member', authMiddleware, teamController.fetchTeamMembers)
.delete('/tenant/team/del/member', authMiddleware, teamController.deleteTeamMember)


module.exports = router;