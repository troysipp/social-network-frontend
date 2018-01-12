import React, { Component } from "react";
import { connect } from "react-redux";
import { axios } from "axios";

import { fetchEventsIfNeeded } from "../actions/events";
import store from "../store";
import "./EventsList.css";

class EventsList extends Component {
  constructor(props) {
    super(props);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.props.dispatch(fetchEventsIfNeeded());
  }

  componentDidMount() {
    this.props.dispatch(fetchEventsIfNeeded());
  }

  render() {
    let events = this.props.events.map((event, i) => {
      console.log(event);
      return (
        <div className="event" key={i}>
          <span className="bold">{event.description}</span>

          <p>
            <span>Location: {event.location}</span>
            <span> by {event.organizer.username}</span>
          </p>
          <span className="attendance">
            <span>
              <p>
                People coming so far:{" "}
                <span className="bold">{event.attendees.length}</span>
              </p>
            </span>
            {store.getState().auth.authenticated && (
              <span>
                <button type="submit" className="join">
                  Join em!
                </button>
              </span>
            )}
          </span>
        </div>
      );
    });

    return (
      <div className="events">
        <h2>Events Near You!</h2>
        <div className="events-list">
          {!this.props.events.length > 0 ? <p>Loading...</p> : events}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events
  };
};

export default connect(mapStateToProps)(EventsList);
