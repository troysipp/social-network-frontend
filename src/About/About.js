import React, { Component } from "react";

import store from "../store";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div className="content">
        <h2>Wanna know more about us?</h2>
        <div>
          <p>
            We were founded on the idea that at some point in their life,
            everyone is going to be scouting new or old locations for places to
            go and people to meet.
          </p>
          <p>
            We here at JustForFriends want to make those wishes as simple as
            possible for you to achieve!
          </p>
          <p>
            Check out our home page for a listing of all the new events posted
            on the site! And login for the ability to post your own events, see
            events based on cities we've expanded to, and build a community of
            friends and family!
          </p>
        </div>
      </div>
    );
  }
}

export default About;
