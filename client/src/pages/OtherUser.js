import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OtherUser = () => {
  const [user, setUser] = useState([]);
  const [creationDate, setCreationDate] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${userId}`
        );
        setUser(response.data);
        setCreationDate(response.data.createdAt.split("T")[0]);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <h2>Other User</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>User since: {creationDate} </p>
    </div>
  );
};

export default OtherUser;
