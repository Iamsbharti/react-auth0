import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    //Handle euthentication if expected values are in URL
    //this.props.location --provides the current url.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid CallBack URL!");
    }
  }
  render() {
    return <div>Loading...</div>;
  }
}
export default Callback;
