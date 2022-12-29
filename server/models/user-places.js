import mongoose from "mongoose";

const { Schema } = mongoose;

const userPlaceSchema = new Schema(
  {
    name: {
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
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserPlaces", userPlaceSchema);
