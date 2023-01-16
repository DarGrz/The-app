import React, { useEffect, useState } from "react";
import axios from "axios";

// All Places Accessible for eveeryone

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/places/all-places"
        );
        setPlaces(response.data);
        console.log(places);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllPlaces();
  }, []);

  return (
    <>
      <div>
        {places.map((place) => (
          <div key={place._id}>
            <p>{place.name}</p>
            <p>{place.creator}</p>
            <p>{place.createdAt}</p>
            <p>Users joined: {place.users.length} </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPlaces;
