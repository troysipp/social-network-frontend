import React, { Component } from "react";

import store from "../store";
import "./Profile.css";

class Profile extends Component {
  render() {
    console.log(store.getState());
    console.log(this.props);
    return (
      <div className="profile">
        <h2>Troy Sipprelle</h2>
        <p>
          Chosen city: <span className="bold">Washington, D.C.</span>
        </p>
        <button type="submit" className="join">
          Change
        </button>
        <h3>Events Organized:</h3>
        <p>• Soccer on the mall</p>
        <button type="submit" className="join">
          Host another!
        </button>
      </div>
    );
  }
}

export default Profile;
