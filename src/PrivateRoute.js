import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            //1Redirect to login if not logged in.
            if (!auth.isAuthenticated()) return auth.login();

            //Display Error message if user lacks required scopes.
            if (scopes.lenght > 0 && !auth.hasUserScopes(scopes)) {
              return (
                <h1>
                  Unauthorized -You need the following scope(s) to view this
                  page.
                  {scopes.join(",")}.
                </h1>
              );
            }
            //3.Render Component
            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
  scopes: []
};
export default PrivateRoute;
