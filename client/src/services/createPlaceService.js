import axios from "axios";

const API_URL = "http://localhost:5000/places/";

const createPlace = (name, address, creator) => {
  return axios.post(
    API_URL + "create-place",
    {
      name: name,
      address: address,
      creator,
    },
    console.log("Place created " + name, address, creator)
  );
};

const placeService = {
  createPlace,
};

export default placeService;
