import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  dysc: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  playersNum: {
    type: Number,
    required: true,
  },
  reservePlayersNum: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  nextGame: {
    type: Date,
  },
  players: [],
  reservePlayers: [],
});

module.exports = mongoose.model("Places", placeSchema);
