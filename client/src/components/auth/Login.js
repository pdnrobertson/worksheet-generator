import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import authContext from "../../context/auth-context";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDashboard: false
    };

    // Instead of using state:
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  static contextType = authContext;

  handleSubmit = async event => {
    event.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            token
            userId
          }
        }
      `
    };

    this.emailEl.current.value = "";
    this.passwordEl.current.value = "";

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to login.");
      }

      const responseData = await response.json();
      const { token, userId } = responseData.data.login;

      if (token) {
        this.context.login(token, userId);
        localStorage.setItem("token", token);
      } else {
        throw new Error("User token not found.");
      }

      return;
    } catch (err) {
      throw err;
    }
  };
  render() {
    if (this.state.redirectToDashboard) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                ref={this.emailEl}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone.
              </small>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                ref={this.passwordEl}
                required
              />
            </div>
          </fieldset>
          <br />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
