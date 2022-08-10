const router = require('express').Router();
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');
const scheduleController = require('../controllers/scheduleController');
const scoreController = require('../controllers/scoreController');
const userController = require('../controllers/userController');
const teamMiddleware = require('../middleware/team');
const playerMiddleware = require('../middleware/player');
const scheduleMiddleware = require('../middleware/scheduleMatch');
const updateScore = require('../middleware/updateScore');
const userSchema = require('../middleware/user');
const loginMiddleware = require('../middleware/login');

// Team Routes
router.get('/', loginMiddleware.verifyToken, teamController.getTeam);
router.post('/createTeam', loginMiddleware.verifyToken, teamMiddleware, teamController.createTeam);
router.patch('/updateTeam/:id', loginMiddleware.verifyToken, teamController.updateTeam);
router.delete('/deleteTeam/:id', loginMiddleware.verifyToken, teamController.deleteTeam);
router.get('/typeFilter', loginMiddleware.verifyToken, teamController.typeFilter);

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

// JWT Authentication routes
router.post('/register', userSchema, userController.register);
router.post('/login',loginMiddleware.loginSchema, userController.login);


router.get('/post',loginMiddleware.verifyToken, (req, res) => {
    res.send("Hello Mayank, You are Authenticated!!");
});


module.exports = router;