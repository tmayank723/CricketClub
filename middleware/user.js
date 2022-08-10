const Joi = require('joi');

const userSchema = async(req, res, next) => { 
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            c_password: Joi.any().equal(Joi.ref('password')).required()
        }); 
        const value = await schema.validate(req.body);
        if (value.error) {
            return res.status(400).json({
                status: 400,
                message: value.error.details[0].message
            })
        } 
        return next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = userSchema