import React, { useCallback } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

const Nav = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/all-users">Users</Link>
        </li>
        <li>
          <Link to="/all-places">Places</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/create-place">Create place</Link>
            </li>
            <li>
              <Link to="/user-places">My places</Link>
            </li>
            <li>
              <Link to="/login" disabled>
                My Account
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={logOut} disabled>
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
