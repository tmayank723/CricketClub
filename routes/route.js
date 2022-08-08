const router = require('express').Router();
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');
const scheduleController = require('../controllers/scheduleController');
const teamMiddleware = require('../middleware/team');
const playerMiddleware = require('../middleware/player');
const scheduleMiddleware = require('../middleware/scheduleMatch');
const updateScore = require('../middleware/updateScore');

// Team Routes
router.get('/', teamController.getTeam);
router.post('/createTeam', teamMiddleware, teamController.createTeam);
router.patch('/updateTeam/:id', teamController.updateTeam);
router.delete('/deleteTeam/:id', teamController.deleteTeam);

// Player routes
router.get('/players', playerController.getPlayer);
router.post('/createPlayer', playerMiddleware, playerController.createPlayer);
router.patch('/updatePlayer/:id', playerController.updatePlayer);
router.delete('/deletePlayer/:id', playerController.deletePlayer);
router.get('/filterAge', playerController.filter);
router.get('/playerHistory/:id', playerController.getPlayerMatchHistory);

// Schedule Match routes
router.post('/createMatch', scheduleMiddleware, scheduleController.createMatch);
router.get('/scheduleMatches', scheduleController.getScheduleMatches);
router.patch('/updateScore', updateScore,scheduleController.updateScore);
router.get('/getAllMatches', scheduleController.getAllMatch);


module.exports = router;