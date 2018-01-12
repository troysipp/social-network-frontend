import React, { Component } from "react";
import store from "../store";

class Profile extends Component {
  render() {
    console.log(store.getState());
    console.log(this.props);
    return <p>This is the profile view.</p>;
  }
}

export default Profile;
