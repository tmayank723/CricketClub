const Joi = require('joi');
const scheduleMatchSchema = async(req, res, next) => { 
    const schema = Joi.object({
        teams: Joi.array().items(Joi.string().required()).unique().default([]),
        venue: Joi.string().required(),
        match_date: Joi.date().required(),
        start_time: Joi.string().required(),
        end_time : Joi.string().required(),
        type: Joi.string().valid('Domestic', 'International').required(),
        score: Joi.number().optional().default(0),
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

module.exports = scheduleMatchSchema