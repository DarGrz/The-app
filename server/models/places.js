import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    full: false,
    about: {
      type: String,
    },
    playersNum: {
      type: Number,
    },
    maxReservewPlayers: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    nextGame: {
      type: Date,
    },
    players: {
      type: Array,
    },
    reservePlayers: {
      type: Array,
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Places", placeSchema);
