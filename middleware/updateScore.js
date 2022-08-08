const Joi = require('joi');

const updateScore = async (req, res, next)=>{
    const schema = Joi.object({
        match_id: Joi.string().required(),
        player_id: Joi.string().required(),
        runs: Joi.number().required()
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

module.exports = updateScore;