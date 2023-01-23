import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Player from "../components/Player";

// Place page with all it's informations

// For now only API connection check

const Place = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [place, setPlace] = useState([]);
  const [users, setUsers] = useState([]);
  const [created, setCreated] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  // const placeId = location.pathname.substring(12);
  const placeId = location.pathname.split("/")[2];
  const userId = currentUser.user._id;

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/place/${placeId}`
        );
        setPlace(response.data);
        setUsers(response.data.users);
        setCreated(response.data.createdAt.split("T")[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlace();
  }, []);

  const joinPlaceHandler = () => {
    return axios
      .patch(`http://localhost:5000/places/join-place/${place._id}`, {
        userId,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        }
      });
  };
  const leavePlaceHandler = () => {
    return axios
      .patch(`http://localhost:5000/places/leave-place/${place._id}`, {
        userId,
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div>
      <h2>Place</h2>
      <h4>{place.name}</h4>
      <p>Address: {place.address}</p>
      <p></p>
      <p>Players:</p>
      {users.map((user) => (
        <Player userId={user} key={user} />
      ))}
      <p>Added: {created}</p>
      <button onClick={joinPlaceHandler}>Join Place</button>
      {error && <p>{error}</p>}
      <button onClick={leavePlaceHandler}>Leave Place</button>
    </div>
  );
};

export default Place;
