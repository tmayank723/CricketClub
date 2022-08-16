const Joi = require('joi');

const updatePlayerScore = async (req, res, next)=>{
    const schema = Joi.object({
        match_id: Joi.string().required(),
        player_id: Joi.string().required(),
        team1Id: Joi.string().required(),
        team2Id: Joi.string().required(),
        score: Joi.number().optional(),
        wickets: Joi.number().optional()
    });
    const value = await schema.validate(req.body);
    if (value.error) {
        return res.status(400).json({
            status: 400,
            message: value.error.details[0].message
        });
    } else {
        next();
    }
}

const updateTeamsScore = async (req, res, next) => {
    const schema = Joi.object({
        match_id: Joi.string().required(),
        team1: Joi.object({
            team_id: Joi.string().required(),
            team1Score: Joi.number().required(),
        }),
        team2: Joi.object({
            team_id: Joi.string().required(),
            team2Score: Joi.number().required(),
        }),
    });
    const value = await schema.validate(req.body);
    if (value.error) {
        res.status(400).json({
            status: 400,
            message: value.error.details[0].message
        });
    } else {
        next();
    }
}

module.exports = {
    updatePlayerScore,
    updateTeamsScore
};