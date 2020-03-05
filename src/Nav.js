import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/public">Public API</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/private">Private API</Link>
            </li>
          )}
          {isAuthenticated() && userHasScopes(["read:cources"]) && (
            <li>
              <Link to="/cource">Cources</Link>
            </li>
          )}
          <li>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log out" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Nav;
