import React, { Component } from "react";

import "./Home.css";
import FriendsList from "../Friends/FriendsList";
import EventsList from "../Events/EventsList";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <FriendsList />
        <EventsList />
      </div>
    );
  }
}

export default Home;
