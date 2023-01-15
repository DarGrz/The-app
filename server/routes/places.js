import express from "express";
import Places from "../models/places.js";
import validation from "../middleware/validation.js";
import createPlaceSchemaValidation from "../validations/createPlaceValidation.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  createPlace,
  findPlace,
  getAllPlaces,
  userPlaces,
  joinPlace,
  leavePlace,
} from "../controllers/placeContoller.js";

const router = express.Router();

router.post(
  "/create-place",
  validation(createPlaceSchemaValidation),
  createPlace
);

router.get("/all-places", getAllPlaces);

router.get("/user-places/:userId", userPlaces); // Places created by user
router.patch("/join-place/:placeId", joinPlace);
router.patch("/leave-place/:placeId", leavePlace);

router.get("/place/:placeId", findPlace);

export default router;
