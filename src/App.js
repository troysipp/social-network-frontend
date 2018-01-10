import React, { Component } from "react";
import { withRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  // retrieveEvents() {
  //   axios
  //     .get(`http://localhost:3001/api/events`)
  //     .then(res => {
  //       this.setState({
  //         events: res.data.events
  //       });
  //       console.log("dogs");
  //       console.log(this.state);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  //
  // componentDidMount() {
  //   console.log(this.state);
  //   this.retrieveEvents(console.log());
  // }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <h1>Title</h1>
          <div className="nav-items">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/profile" className="nav-item">
              Profile
            </Link>
          </div>
        </div>
        <Switch className="body">
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
