const Joi = require('joi');
const jwt = require('jsonwebtoken');

const loginSchema = async(req, res, next) => { 
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
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
    } catch (error) {
        console.log(error);
    }
}   

// Verify the JWT Token 
const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.headers["access-token"];
        if (!token) {
            return res.status(400).json({ error: "A token must be provided for Authentication" });
        }
        await jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    } 
}

module.exports = {
    loginSchema,
    verifyToken
}