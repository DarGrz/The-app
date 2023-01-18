import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Place page with all it's informations

// For now only API connection check

const Place = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [place, setPlace] = useState([]);
  const location = useLocation();
  const placeId = location.pathname.substring(1);
  console.log(placeId, place);
  const userId = currentUser.user._id;

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/place/${placeId}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlace();
  }, []);

  const joinPlaceHandler = (userId) => {
    return axios.put(`http://localhost:5000/places/join-place/${place._id}`, {
      userId,
    });
  };
  // const leavePlaceHandler = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/places/leave-place/${user._id}`
  //     );
  //     setPlaces(response.data);
  //     console.log(places);
  //   } catch (error) {
  //     console.log("Error from UsersList");
  //   }
  // };

  return (
    <div>
      <p>Name: {place.name}</p>
      <p>Creator {place.creator}</p>
      <p>Players: {place.users}</p>
      <button onClick={joinPlaceHandler}>Join Place</button>
      {/* <button onClick={leavePlaceHandler}></button> */}
    </div>
  );
};

export default Place;
