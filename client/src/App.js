import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Users from "./pages/Users";
import Nav from "./pages/Nav";
import CreatePlace from "./pages/CreatePlace";
import UserPlaces from "./pages/UserPlaces";
import { useSelector } from "react-redux";
import AllPlaces from "./pages/AllPlaces";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <h1>THE APP</h1>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/all-users" element={<Users />} />
          <Route path="/user" element={<User />} />
          <Route path="/create-place" element={<CreatePlace />} />
          <Route path="/user-places" element={<UserPlaces />} />
          <Route path="/all-places" element={<AllPlaces />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
