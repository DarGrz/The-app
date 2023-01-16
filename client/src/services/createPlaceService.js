import axios from "axios";

const API_URL = "http://localhost:5000/places/";

const createPlace = (name, creator) => {
  return axios.post(
    API_URL + "create-place",
    {
      name: name,
      creator,
    },
    console.log("Place created " + name, creator)
  );
};

const placeService = {
  createPlace,
};

export default placeService;
