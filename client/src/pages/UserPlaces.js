import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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
        console.log(places);
      } catch (error) {
        console.log("Error from UsersList");
      }
    };
    getUserPlaces();
  }, []);

  const joinPlaceHandler = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/places/join-place/${places._id}`
      );
      setPlaces(response.data);
      console.log(places);
    } catch (error) {
      console.log("Error from UsersList");
    }
  };
  const leavePlaceHandler = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/places/leave-place/${user._id}`
      );
      setPlaces(response.data);
      console.log(places);
    } catch (error) {
      console.log("Error from UsersList");
    }
  };

  return (
    <>
      <div>
        {places.map((place) => (
          <div key={place._id}>
            <p>{place.name}</p>
            <p>{place.users}</p>
            <p>{place.users.length}</p>

            <button onClick={joinPlaceHandler}>Join Place</button>
            <button onClick={leavePlaceHandler}>Leave Place</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPlaces;
