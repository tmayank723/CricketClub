const Team = require('../models/Team');
const { ObjectId } = require('mongodb');

const createTeam = async (req, res) => {
    try {
        const data = await Team.createTeam(req.body);
        res.status(200).json({ success: "Team Created Successfully!!" });
    } catch (error) {
        console.log(error.message);
    }
}

const getTeam = async (req, res) => {
    try {
        const data = await Team.getTeam();
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
    }
}

const updateTeam = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        await Team.updateTeam(_id, req.body);
        res.status(200).json({ success: "Team Updated Successfully!!" });
    } catch (error) {
        console.log(error.message);
    }
}

const deleteTeam = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        await Team.deleteTeam(_id);
        res.status(200).json({ success: "Team Deleted Successfully!!" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
    }
}

const typeFilter = async (req, res) => {
    try {
        const type = req.query.type;
        const team = await Team.typeFilter(type);
        res.status(200).send(team);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createTeam,
    getTeam,
    updateTeam,
    deleteTeam,
    typeFilter
}