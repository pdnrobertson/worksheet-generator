import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import AuthContext from "../context/auth-context";

export class Navbar extends Component {
  state = {
    navCollapsed: true
  };

  _onToggleNav = () => {
    this.setState({ navCollapsed: !this.state.navCollapsed });
  };

  render() {
    const show = this.state.navCollapsed ? "show" : "";
    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                  <NavLink className="navbar-brand" to="/dashboard">
                    WorkSheet Generator
                  </NavLink>
                  <button
                    className="navbar-toggler collapsed"
                    type="button"
                    onClick={this._onToggleNav}
                    data-toggle="collapse"
                    data-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>

                  <div
                    className={" collapse navbar-collapse " + show}
                    id="navbarColor01"
                  >
                    <ul className="navbar-nav mr-auto">
                      {context.token && (
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/dashboard">
                            <span>Dashboard</span>
                          </NavLink>
                        </li>
                      )}
                      {context.token && (
                        <li className="navbar-nav">
                          <button
                            onClick={context.logout}
                            className="btn btn-primary"
                          >
                            Logout
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Navbar;
