import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { trimAndCheck } from "../utilities/helperFunctions";
import authContext from "../context/auth-context";

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDashboard: false
    };

    // Instead of using state:
    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
    this.schoolEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  static contextType = authContext;

  handleSubmit = async event => {
    event.preventDefault();

    const firstName = this.firstNameEl.current.value;
    const lastName = this.lastNameEl.current.value;
    const school = this.schoolEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (
      trimAndCheck(firstName) ||
      trimAndCheck(lastName) ||
      trimAndCheck(school) ||
      trimAndCheck(email) ||
      trimAndCheck(password)
    ) {
      return;
    }

    const requestBody = {
      query: `
              mutation {
                signup(signupInput: { firstName: "${firstName}", lastName: "${lastName}", school: "${school}", email: "${email}", password: "${password}"}) {
                  token
                  userId
                }
              }
            `
    };

    this.firstNameEl.current.value = "";
    this.lastNameEl.current.value = "";
    this.passwordEl.current.value = "";
    this.emailEl.current.value = "";
    this.schoolEl.current.value = "";

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed");
      }

      const responseData = await response.json();
      const { token, userId } = responseData.data.signup;

      if (token) {
        this.context.login(token, userId);
      } else {
        throw new Error("User token not found.");
      }

      this.setState({ redirectToDashboard: true });
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
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                ref={this.firstNameEl}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                ref={this.lastNameEl}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="school">School</label>
              <input
                id="school"
                type="text"
                className="form-control"
                ref={this.schoolEl}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailSU">Email</label>
              <input
                type="email"
                id="emailSU"
                className="form-control"
                ref={this.emailEl}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="passwordSU"
                type="password"
                className="form-control"
                ref={this.passwordEl}
                required
              />
              <small id="passwordHelp" className="form-text text-muted">
                Make sure you choose a secure password.
              </small>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
