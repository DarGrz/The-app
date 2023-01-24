import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error from UsersList");
      });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <Link to={`/all-users/${user._id}`} key={user._id}>
          <p>
            {user.firstName} {user.lastName} {user._id}
          </p>
        </Link>
      ))}
      <p>{users.length}</p>
    </div>
  );
};

export default Users;
