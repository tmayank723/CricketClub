const Joi = require('joi');

const teamSchema = async(req, res, next) => { 
    try {
        const schema = Joi.object({
            country: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string().valid('Domestic','International').required()
        }); 
        const value = await schema.validate(req.body);
        if (value.error) {
            res.status(400).json({
                status: 400,
                message: value.error.details[0].message
            })
        } 
        return next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = teamSchema