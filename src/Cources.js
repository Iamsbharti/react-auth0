import React, { Component } from "react";

class Cources extends Component {
  state = {
    cources: [],
    message: ""
  };
  componentDidMount() {
    fetch("/cource", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        console.log(response.cources);
        throw new Error("Network problem in fetching cources api");
      })
      .then(response => this.setState({ cources: response.cources }))
      .catch(error => this.setState({ message: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error("Network problem in fetching cources api");
      })
      .then(response => console.log(response))
      .catch(error => this.setState({ message: error.message }));
  }
  render() {
    return (
      <ul>
        {this.state.cources.map(cource => {
          return <li key={cource.id}>{cource.title}</li>;
        })}
      </ul>
    );
  }
}

export default Cources;
