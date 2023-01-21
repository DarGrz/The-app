import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Place page with all it's informations

// For now only API connection check

const Place = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [place, setPlace] = useState([]);
  const [exist, setExist] = useState(false);
  const location = useLocation();
  // const placeId = location.pathname.substring(12);
  const placeId = location.pathname.split("/")[2];
  const userId = currentUser.user._id;
  console.log(location);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/place/${placeId}`
        );
        setPlace(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlace();
  }, []);

  const userExists = () => {
    if (place.users.filter((user) => user._id === userId)) {
      setExist(true);
    }
  };

  console.log(exist);

  const joinPlaceHandler = () => {
    return axios
      .patch(`http://localhost:5000/places/join-place/${place._id}`, {
        userId,
      })
      .then(() => {
        window.location.reload();
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
      <p>Name: {place.name}</p>
      <p>Creator {place.creator}</p>
      <p>Players: {place.users}</p>
      <p>Added: {place.createdAt}</p>
      <button onClick={joinPlaceHandler}>Join Place</button>
      <button onClick={leavePlaceHandler}>Leave Place</button>
    </div>
  );
};

export default Place;
