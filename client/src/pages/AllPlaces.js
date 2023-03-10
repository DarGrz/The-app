import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "../components/Player";

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
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllPlaces();
  }, []);

  return (
    <>
      <h2>All Places</h2>
      <div>
        {places.map((place) => (
          <div key={place._id}>
            <Link to={`/all-places/${place._id}`}>
              <p>{place.name}</p>
            </Link>
            <p>
              <strong>Created by:</strong>
            </p>
            <Player userId={place.creator} />
            <p>{place.createdAt.split("T")[0]}</p>
            <p>Users joined: {place.users.length} </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPlaces;
