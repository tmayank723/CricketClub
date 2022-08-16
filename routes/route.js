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

// Create Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Swagger for Cricket Club'
        },
        components: {
            securitySchemes : {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'access-token',
                    description: "The token for authentication"
                },
            },
        }
    },
    apis: ['./routes/route*.js'],
}

const swaggerDocument = swaggerJSDoc(swaggerOptions);

// Swagger Open Doc API URL
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Team Swagger
 
/**
 * @swagger
 * /:
 *  get:
 *      summary: This API is used to Get all the Teams Records
 *      security: 
 *         - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: To Test get Method
 */

router.get('/', loginMiddleware.verifyToken, teamController.getTeam);

/**
 * @swagger
 * /createTeam:
 *   post:
 *     security: 
 *        - ApiKeyAuth: []
 *     parameters:
 *      - in: body
 *        name: createTeam
 *        description: New createTeam
 *        schema:
 *          type: object
 *          properties:
 *            country:
 *              type: string
 *            name:
 *              type: string
 *            type:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/createTeam', loginMiddleware.verifyToken, teamMiddleware, teamController.createTeam);

router.patch('/updateTeam/:id', loginMiddleware.verifyToken, teamController.updateTeam);

/**
 * @swagger
 * /deleteTeam/{id}:
 *   delete:
 *     security: 
 *       - ApiKeyAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: Enter the Team ID
 *        required: tr  ue
 *        type: string
 *        
 *     responses:
 *       201:
 *         description: Team Deleted successfully
 */
router.delete('/deleteTeam/:id',loginMiddleware.verifyToken, teamController.deleteTeam);
router.get('/typeFilter', loginMiddleware.verifyToken, teamController.typeFilter);

// Player routes
/**
 * @swagger
 * /players:
 *  get:
 *      summary: This API is used to Get all the Players Records
 *      responses:
 *          200:
 *              description: To Test get Method
 */
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

module.exports = router;