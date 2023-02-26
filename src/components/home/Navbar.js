import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutFirebase } from "../../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Event Planner
            <i className="fas fa-code"></i>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={handleClick}>
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/eventForm"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Add Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/joinEvent" className="nav-links">
                    Join Events
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            <li className="nav-item">
              <Link to="/eventList" className="nav-links" onClick={handleClick}>
                All Events
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <span className="nav-links">{user?.email}</span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-links" onClick={handleClick}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              {isLoggedIn ? (
                <Link className="nav-links" onClick={handleClick}>
                  <Link
                    className="nav-links"
                    onClick={() => {
                      dispatch(userLogoutFirebase());
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Link>
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
