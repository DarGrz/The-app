import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  console.log(currentUser.user);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user.firstName.toUpperCase() + " "}</strong>
          <strong>{currentUser.user.lastName.toUpperCase() + " "}</strong>
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.user._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>User Since:</strong> {currentUser.user.createdAt}
      </p>

      {/* Favorites */}
      {/* Friends */}
      {/* Game History */}
      {/* Next Game*/}

      <div></div>
    </div>
  );
};

export default User;
