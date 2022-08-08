const Team = require('../models/Team');
const { ObjectId } = require('mongodb');

// Database Configuration
const db = require('../DBConnect/db');

const createMatch = async (req, res) => {
    try {
        const team1 = await db.get().collection('teams').findOne({ name: req.body.teams[0] });
        const team2 = await db.get().collection('teams').findOne({ name: req.body.teams[1] });
        if (!team1) {
            return res.status(400).json({ error: `${req.body.teams[0]} was not Registered!!` });
        }else if (!team2) {
            return res.status(400).json({ error: `${req.body.teams[1]} was not Registered!!` });
        } else {
            const data = await Team.createScheduleMatch(req.body);
            res.status(200).json({ success: "Match Secheduled Successfully!!", data });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getScheduleMatches = async (req, res) => {
    try {
        const matches = await Team.getScheduleMatches();
        return res.status(200).send(matches);
    } catch (error) {
        console.log(error.message);
    }
}

const updateScore = async (req, res) => {
    try {
        const matchId = new ObjectId(req.body.match_id);
        const playerId = new ObjectId(req.body.player_id);
        const runs = parseInt(req.body.runs);
        await Team.updateScoreWithMatchId(matchId, runs);
        await Team.updateScoreWithPlayerId(playerId, matchId, runs);
        res.status(200).json({ success: "Score Updated Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

const getAllMatch = async (req, res) => {
    try {
        const type = req.query.type;
        const venue = req.query.venue;
        const date = req.query.date;
        const data = await Team.getAllMatch(type, venue, date);
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createMatch,
    getScheduleMatches,
    updateScore,
    getAllMatch
}