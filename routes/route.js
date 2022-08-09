const router = require('express').Router();
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');
const scheduleController = require('../controllers/scheduleController');
const scoreController = require('../controllers/scoreController');
const teamMiddleware = require('../middleware/team');
const playerMiddleware = require('../middleware/player');
const scheduleMiddleware = require('../middleware/scheduleMatch');
const updateScore = require('../middleware/updateScore');

// Team Routes
router.get('/', teamController.getTeam);
router.post('/createTeam', teamMiddleware, teamController.createTeam);
router.patch('/updateTeam/:id', teamController.updateTeam);
router.delete('/deleteTeam/:id', teamController.deleteTeam);
router.get('/typeFilter', teamController.typeFilter);

// Player routes
router.get('/players', playerController.getPlayer);
router.post('/createPlayer', playerMiddleware, playerController.createPlayer);
router.patch('/updatePlayer/:id', playerController.updatePlayer);
router.delete('/deletePlayer/:id', playerController.deletePlayer);
router.get('/filterAge', playerController.filter);

// Schedule Match routes
router.post('/createMatch', scheduleMiddleware, scheduleController.createMatch);
router.get('/scheduleMatches', scheduleController.getScheduleMatches);
router.post('/updatePlayerScore', updateScore.updatePlayerScore,scoreController.updatePlayerScore);
router.post('/updateTeamsScore', updateScore.updateTeamsScore,scoreController.updateTeamsScore);
router.get('/playerHistory/:id', scoreController.getPlayerMatchHistory);
router.get('/allMatches/:id', scoreController.getPlayerMatchHistory);
router.get('/liveMatches', scoreController.liveMatches);
router.get('/pastMatches', scoreController.pastMatches);
router.get('/upcomingMatches', scoreController.upcomingMatches);


module.exports = router;