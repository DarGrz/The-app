import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const UserPlaces = () => {
  const [places, setPlaces] = useState([]);

  const { user } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/user-places/${user._id}`
        );
        setPlaces(response.data);
      } catch (error) {
        console.log("Error from UsersList");
      }
    };
    getUserPlaces();
  }, []);

  return (
    <>
      <h2>User Places</h2>
      <div>
        {places.map((place) => (
          <div key={place._id}>
            <Link to={`/all-places/${place._id}`}>
              <p>{place.name}</p>
            </Link>
            <p>{place.users}</p>

            <p>{place.users.length}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPlaces;
