const db = require('../DBConnect/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let { name, email, password, c_password } = req.body;
        if (!name || !email || !password, !c_password) {
            return res.status(400).send({ error: 'All the Fields are required!!' });
        } else if (password != c_password) {
            return res.status(400).send({ error: 'Passwords are not Matched!!' });
        } else {
            const user = await db.get().collection('users').findOne({ email });
            if (user) return res.status(400).send({ error: 'User Already Registered!!' }); 
            const hashPassword = await bcrypt.hash(password, 12);
            password = hashPassword
            const data = await db.get().collection('users').insertOne({ name, email, password });
            res.status(200).send({ success: "User Registered Successfully!!",data });
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'All the Fields are required!!' });
        } else {
            const user = await db.get().collection('users').findOne({ email });
            if (!user) return res.status(400).send({ error: "Invalid Credentials!!" });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).send({ error: "Invalid Email & Password!!" });
            const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
            await db.get().collection('users').updateOne({ email }, { $set: { token: token} });
            res.status(200).send({ success: "User Login Successfully!!",user });
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    register,
    login
}