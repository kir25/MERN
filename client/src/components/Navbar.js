import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper blue darken-1" style={{ padding: "0.2rem" }}>
        <span class="brand-logo">Links</span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
