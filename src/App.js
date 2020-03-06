import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Cources from "./Cources";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";
class App extends Component {
  constructor(props) {
    super(props);
    // this.auth = new Auth(this.props.history); //we are geeting histrory from index's browserrouter
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home {...props} auth={auth} />}
          />
          <Route
            path="/callback"
            render={props => <Callback {...props} auth={auth} />}
          />
          <Route path="/public" component={Public} auth={auth} />
          <PrivateRoute path="/private" component={Private} />
          {/**show profile only on authetication otherwise redirect the user to home */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute
            path="/cource"
            component={Cources}
            scopes={["read:cources"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
