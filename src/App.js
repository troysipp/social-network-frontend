import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import logo from "./logo.svg";
import "./App.css";

// const App = () => (
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  retrieveEvents() {
    axios
      .get(`http://localhost:3001/api/events`)
      .then(res => {
        this.setState({
          events: res.data.events
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
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
            <Route
              exact
              path="/home"
              render={props => {
                return (
                  <Home
                    retrieveEvents={this.retrieveEvents}
                    events={this.state.events}
                  />
                );
              }}
            />
            <Route exact path="/profile" component={Profile} />
            <Route path="/*" render={() => <Redirect to="/home" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
