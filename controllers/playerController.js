const Team = require('../models/Team');
const { ObjectId } = require('mongodb');

// Database Configuration
const db = require('../DBConnect/db');

const createPlayer = async (req, res) => {
    try {
        const _id = new ObjectId(req.body.team_id);
        const team = await db.get().collection('teams').findOne({ _id });
        if (!team) {
            return res.status(400).json({ error: "Team Not Registered!!" });
        }
        await Team.createPlayer(req.body);
        res.status(200).json({ success: "Player Created Successfully!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getPlayer = async (req, res) => {
    try {
        const data = await Team.getPlayer();
        res.status(200).send(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updatePlayer = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        await Team.updatePlayer(_id, req.body);
        res.status(200).json({ success: "Player Updated Successfully!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deletePlayer = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        await Team.deletePlayer(_id);
        res.status(200).json({ success: "Player Deleted Successfully!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const filter = async (req, res) => {
    try {
        const age = parseInt(req.query.age);
        const score = parseInt(req.query.score);
        const data = await Team.filter(age, req.query.role, score);
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
    }
}

const getPlayerMatchHistory = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const data = await Team.getPlayerMatchHistory(playerId);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createPlayer,
    getPlayer,
    updatePlayer,
    deletePlayer,
    filter,
    getPlayerMatchHistory
}