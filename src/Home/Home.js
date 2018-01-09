import React, { Component } from "react";

import "./Home.css";
import FriendsList from "../Friends/FriendsList";
import EventsList from "../Events/EventsList";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-page">
        <EventsList events={this.props.events} />
        <FriendsList />
      </div>
    );
  }
}

export default Home;
