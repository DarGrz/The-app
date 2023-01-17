import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Place page with all it's informations

// For now only API connection check

const Place = () => {
  const [place, setPlace] = useState([]);
  const location = useLocation();
  const placeId = location.pathname.substring(1);
  console.log(placeId, place);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/place/${placeId}`
        );
        setPlace(response.data);
        console.log(place);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlace();
  }, []);

  return (
    <div>
      {place.name} {place.creator} {place.users}
    </div>
  );
};

export default Place;
