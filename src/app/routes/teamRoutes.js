const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const teamController = require('../controllers/teamController');

router.post('/tenant/team', authMiddleware, teamController.createTeam)
router.post('/tenant/team/add', authMiddleware, teamController.addTeamMember)
router.get('/tenant/team/staff/list', authMiddleware, teamController.getTenantStaffs)
router.post('/tenant/team/add/project', authMiddleware, teamController.addProjectToTeam)

module.exports = router;