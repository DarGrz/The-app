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
        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/create-place">Create place</Link>
            </li>
            <li>
              <Link to="/user-places">My places</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/login" onClick={logOut} disabled>
                Logout
              </Link>
            </li>
            <li>
              <Link to="/login" disabled>
                My Account
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/all-users">All Users</Link>
        </li>
        <li>
          <Link to="/all-places">All Places</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
