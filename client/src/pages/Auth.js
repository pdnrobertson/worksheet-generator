import React, { Component } from "react";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

export class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    };

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    const loginComponent = (
      <div>
        <Login />
        <br />
        <button
          onClick={this.handleSwitch}
          className="btn btn-success btn-lg btn-block"
        >
          Not a member? Sign Up!
        </button>
      </div>
    );

    const signUpComponent = (
      <div>
        <SignUp />
        <br />
        <button
          onClick={this.handleSwitch}
          className="btn btn-primary btn-lg btn-block"
        >
          Already a member? Login!
        </button>
      </div>
    );

    return <div>{this.state.isLogin ? loginComponent : signUpComponent}</div>;
  }
}

export default Auth;
