import axios from "axios";
import React, { useState, useEffect } from "react";

const Player = ({ userId }) => {
  const [player, setPlayer] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${userId}`
        );
        console.log(player);
        setPlayer(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <p>
        {player.firstName} {player.lastName}
      </p>
    </div>
  );
};

export default Player;
