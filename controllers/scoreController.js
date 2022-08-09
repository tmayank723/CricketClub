const Team = require('../models/Team');
const { ObjectId } = require('mongodb');

// Database Configuration
const db = require("../DBConnect/db");

const updatePlayerScore = async (req, res) => {
    try {
        const playerId = new ObjectId(req.body.player_id);
        const matchId = new ObjectId(req.body.match_id);
        const team1Id = new ObjectId(req.body.team1Id);
        const team2Id = new ObjectId(req.body.team2Id);
        let score = parseInt(req.body.score);
        let wickets = parseInt(req.body.wickets);
        if (!matchId || !team1Id || !team2Id || !playerId) {
            return res.status(400).send({ error: 'All the Fields are required!!' });
        }
        if (!wickets) wickets = 0;
        if (!score) score = 0;
        const data = await db.get().collection('scores').insertOne({
            player_id: playerId,
            match_id: matchId,
            team1id: team1Id,
            team2id: team2Id,
            score: score,
            wickets: wickets
        });
        res.status(200).send({ success: data });
    } catch (error) {
        console.log(error.message);
    }
}
const updateTeamsScore = async (req, res) => {
    try {
        const matchId = new ObjectId(req.body.match_id);
        const team1Id = new ObjectId(req.body.team1["team_id"]);    
        const team1Score = parseInt(req.body.team1["team1Score"]);
        const team2Id = new ObjectId(req.body.team2["team_id"]);
        const team2Score = parseInt(req.body.team2["team2Score"]);
        let winMatch;
        const team1Name = await db.get().collection('teams').findOne({ _id: team1Id });
        const team2Name = await db.get().collection('teams').findOne({ _id: team2Id });
        if (team1Score > team2Score) {
            winMatch = `${team1Name.name} Wins`;
        } else if (team1Score === team2Score) {
            winMatch = `Match Draw`;
        } else {
            winMatch = `${team2Name.name} Wins`;
        }
        await db.get().collection('schedule_matches').updateOne(
            { _id: matchId },
            { $set: { team1Score: team1Score, team2Score: team2Score, winningTeam: winMatch } }
        );
        res.status(200).send({ success: "Score Updated Successfully!!" });
    } catch (error) {
        console.log(error.message);
    }
}

const getPlayerMatchHistory = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const data = await db.get().collection("players").aggregate([
            { $match: { _id: playerId } },
            // { $addFields: { teamId: { $toObjectId : "$team_id" } } },
            { $lookup: { from: "scores", localField: "_id", foreignField: "player_id", as: "playerHistory" } },
            { $project : { "playerHistory.player_id": 0 }},
            { $unwind: "$playerHistory" },
            { $lookup: { from: "schedule_matches", localField: "playerHistory.match_id", foreignField: "_id", as: "playerMatchHistory" } },
            { $unwind: "$playerMatchHistory" },
        ]).toArray();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

const liveMatches = async (req, res) => {
    try {
        let { type, venue } = req.query;
        let date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        let cond = [];
        if(type) cond.push({ $match: { type: type } });
        if(venue) cond.push({ $match: { venue: venue } });
        if (date) cond.push({ $match: { match_date: date } });
        cond.push({ $project : { team1Score: 0, team2Score: 0, winningTeam: 0 }})
        const allMatches = await db.get().collection("schedule_matches").aggregate(cond).toArray();
        res.status(200).send(allMatches);
    } catch (error) {
        console.log(error);
    }
}
const upcomingMatches = async (req, res) => {
    try {
        let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let cond = [];
        if (date) cond.push({ $match: { match_date: { $gt: date } } });
        cond.push({ $project : { team1Score: 0, team2Score: 0, winningTeam: 0 }})
        const pastMatches = await db.get().collection("schedule_matches").aggregate(cond).toArray();
        console.log(pastMatches);
        res.status(200).send(pastMatches);
    } catch (error) {
        console.log(error);
    }
}

const pastMatches = async (req, res) => {
    try {
        let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let cond = [];
        if (date) cond.push({ $match: { match_date: { $gt: date } } });
        const pastMatches = await db.get().collection("schedule_matches").aggregate(cond).toArray();
        console.log(pastMatches);
        res.status(200).send(pastMatches);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updatePlayerScore,
    updateTeamsScore,
    getPlayerMatchHistory,
    liveMatches,
    upcomingMatches,
    pastMatches
}