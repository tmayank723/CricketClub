const Joi = require('joi');
const scheduleMatchSchema = async(req, res, next) => { 
    const schema = Joi.object({
        team1: Joi.string().required(),
        team2: Joi.string().required(),
        team1Score: Joi.number().default(0),
        team2Score: Joi.number().default(0),
        venue: Joi.string().required(),
        match_date: Joi.date().required(),
        start_time: Joi.string().required(),
        type: Joi.string().valid('Domestic', 'International').required(),
        winningTeam: Joi.string().default(null),
    });
    const value = await schema.validate(req.body);
    if (value.error) {
        return res.status(400).json({
            status: 400,
            message: value.error.details[0].message
        })
    } else {
        next()
    } 
    
}

module.exports = scheduleMatchSchema