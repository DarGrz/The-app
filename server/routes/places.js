import express from "express";
import Places from "../models/places.js";
import validation from "../middleware/validation.js";
import createPlaceSchemaValidation from "../validations/createPlaceValidation.js";
import { authMiddleware } from "../middleware/auth.js";

const createPlaceRouter = express.Router();

createPlaceRouter.post(
  "/create-place",
  validation(createPlaceSchemaValidation),
  async (req, res) => {
    const {
      name,
      description,
      location,
      about,
      playersNum,
      reservePlayersNum,
      creator,
    } = req.body;

    const place = await Places.findOne({ name }); // Finding user in DB by email
    if (place) {
      return res
        .status(400)
        .json({ message: "Place already exists or name already taken." });
    }

    const newPlace = new Places({
      name,
      description,
      location,
      about,
      playersNum,
      reservePlayersNum,
      creator,
    });

    const newPlaceSavedRes = await newPlace.save();

    if (newPlaceSavedRes) {
      return res.status(200).json({ msg: " New place successfully saved" });
    }
  }
);

createPlaceRouter.get("/places", async (req, res) => {
  const places = await Places.find();
  if (!places) {
    return res.status(401).json({ msg: "No places found" });
  }
  res.status(200).json(places);
});

export default createPlaceRouter;
