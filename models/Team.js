// Database Configuration
const db = require("../DBConnect/db");

// Team Crud Operation
const createTeam = async (data) => {
  return db.get().collection("teams").insertOne(data);
};
const getTeam = async () => {
  return db.get().collection("teams").find({}).toArray();
};
const updateTeam = async (id, data) => {
  return db.get().collection("teams").updateOne({ _id: id }, { $set: data });
};
const deleteTeam = async (id) => {
  return db.get().collection("teams").deleteOne({ _id: id });
};

// Player Crud Operation
const createPlayer = async (data) => {
  return db.get().collection("players").insertOne(data);
};
const getPlayer = async () => {
  return db.get().collection("players").find({}).toArray();
};
const updatePlayer = async (id, data) => {
  return db.get().collection("players").updateOne({ _id: id }, { $set: data });
};
const deletePlayer = async (id) => {
  return db.get().collection("players").deleteOne({ _id: id });
};
const filter = async (age, role, score) => {
  let condition = [];
  if (age) condition.push({ $match: { age: { $eq: age } } });
  if (role) condition.push({ $match: { player_role: role } });
  if (score) condition.push({ $match: { score: { $eq: score } } });
  return db.get().collection("players").aggregate(condition).toArray();
};

// Schedule Match Crud
const createScheduleMatch = async (data) => {
  return db.get().collection("schedule_matches").insertOne(data);
};
const getScheduleMatches = async () => {
  return db.get().collection("schedule_matches").find({}).toArray();
}
const updateScoreWithMatchId = async (matchId, runs) => {
  return db.get().collection("schedule_matches").updateOne({ _id: matchId }, {$inc: { score: runs }});
}
const updateScoreWithPlayerId = async (playerId, matchId, runs) => {
  return db.get().collection("players").updateOne({ _id: playerId }, { $set: { match_id: matchId, player_score: runs} });
}
const getPlayerMatchHistory = async (playerId) => {
  return db.get().collection("players").aggregate([
    { $match: { _id: playerId } },
    { $lookup: { from: "schedule_matches", localField: "match_id", foreignField: "_id", as: "playerHistory" } },
  ]).toArray();
}
const getAllMatch = async (type, venue, date) => {
  let cond = [];
  if(type) cond.push({ $match: { type: type } });
  if(venue) cond.push({ $match: { venue: venue } });
  if(type) cond.push({ $match: { match_date: date } });
  return db.get().collection("schedule_matches").aggregate(cond).toArray();
}

module.exports = {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
  filter,
  createScheduleMatch,
  getScheduleMatches,
  updateScoreWithMatchId,
  updateScoreWithPlayerId,
  getPlayerMatchHistory,
  getAllMatch
};
