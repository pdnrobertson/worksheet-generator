import React, { Component, Fragment } from "react";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AuthContext from "./context/auth-context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId) => {
    console.log("Logging in");
    this.setState({ token, userId });
  };

  logout = () => {
    console.log("Logging out");
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <Navbar />
            <br />
            <div className="container">
              <Switch>
                {this.state.token && (
                  <Redirect exact path="/" to="/dashboard" />
                )}
                {this.state.token && (
                  <Route path="/dashboard" component={Dashboard} />
                )}
                {this.state.token && (
                  <Redirect exact path="/auth" to="/dashboard" />
                )}
                {!this.state.token && <Route path="/auth" component={Auth} />}
                {!this.state.token && <Redirect exact to="/auth" />}
              </Switch>
            </div>
          </AuthContext.Provider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
