import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: Boolean,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 46,
    },
    about: {
      type: String,
    },

    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
    },
    nextGames: [],
    gamesHistory: [],
    gamesPlayed: {
      type: Number,
    },
    userImage: {
      type: String,
      data: Buffer,
    },
    rating: {
      type: Number,
    },
    friends: [],
    favorites: [],
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
