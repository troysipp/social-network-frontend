import React, { Component } from "react";
import { connect } from "react-redux";

import "./Home.css";
import FriendsList from "../Friends/FriendsList";
import EventsList from "../Events/EventsList";
import * as actions from "../actions/users";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  renderContent() {
    if (this.props.content) {
      return <p>{this.props.content}</p>;
    }
  }

  render() {
    return (
      <div className="home-page">
        <EventsList events={this.props.events} />
        <FriendsList />
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Home);
