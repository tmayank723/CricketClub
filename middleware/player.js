const Joi = require('joi');

const playerSchema = async(req, res, next) => { 
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        player_role: Joi.string().required(),
        team_id: Joi.string().required(),
        match_id: Joi.string().optional(),
        player_score: Joi.optional().default(0),
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


module.exports = playerSchema