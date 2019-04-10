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
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <Router>
            <Fragment>
              <div className="container">
                <Route path="/auth" component={Auth} />
                <Route path="/dashboard" component={Dashboard} />
              </div>
            </Fragment>
          </Router>
        </AuthContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
