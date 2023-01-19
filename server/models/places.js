import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    creator: {
      type: String,
    },
    users: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
