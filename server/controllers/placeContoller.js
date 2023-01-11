import { response } from "express";
import Place from "../models/places.js";

export const createPlace = async (req, res) => {
  try {
    const { name, creator } = req.body;

    const place = await Place.findOne({ name }); // finding place in DB by name
    if (place) {
      return res
        .status(400)
        .json({ message: "Place already exists or name already taken." });
    }

    const newPlace = new Place({
      name,
      creator,
    });

    const newPlaceSavedRes = await newPlace.save();

    if (newPlaceSavedRes) {
      return res
        .status(200)
        .json({ newPlaceSavedRes, msg: " New place successfully saved" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    if (!places) {
      return res.status(401).json({ msg: "No places found" });
    }
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userPlaces = async (req, res) => {
  try {
    const places = await Place.find({
      creator: { $in: [req.params.userId] },
    });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const joinPlace = async (req, res) => {
  const placeId = req.params.placeId;
  const userId = req.body.userId;
  try {
    const place = await Place.findByIdAndUpdate(placeId, {
      $push: { users: userId },
    });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const leavePlace = async (req, res) => {
  const placeId = req.params.placeId;
  const userId = req.body.userId;
  try {
    const place = await Place.findByIdAndUpdate(placeId, {
      $pull: { users: userId },
    });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findPlace = async (req, res) => {
  try {
    const place = await Place.findOne({
      _id: { $in: [req.params.placeId] },
    });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json(error);
  }
};