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
const typeFilter = async (type) => {
  let condition = []
  if(type) condition.push({ $match: { type: type } })
  return db.get().collection("teams").aggregate(condition).toArray();
}

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

module.exports = {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  typeFilter,
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
  filter,
  createScheduleMatch,
  getScheduleMatches
};

