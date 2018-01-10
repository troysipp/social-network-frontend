import React, { Component } from "react";
import { connect } from "react-redux";
import { axios } from "axios";
// import {Link} from "react-rourter-dom"

import { fetchEventsIfNeeded } from "../actions/events";

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
      // let pathname = `/events/...`
      return (
        <li className="event" key={i}>
          by {event.organizer.username}
          Description:
          {event.description}
          Location:
          {event.location}
        </li>
      );
    });

    return (
      <div className="events">
        <h2>Events</h2>
        <ul className="events-list">
          {!this.props.events.length > 0 ? <p>Loading...</p> : events}
        </ul>
      </div>
      // {/* <div className="stocks">
      //   {this.props.isFetching && stocks.length === 0 && <h2>Loading...</h2>}
      //   {!this.props.isFetching && stocks.length === 0 && <h2>Empty.</h2>}
      //   {stocks.length > 0 &&
      //     <div>
      //       <h2>Stocks</h2>
      //       <ul className="stocks-list">
      //         {stocks}
      //       </ul>
      //     </div>
      //   }
      // </div> */}
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events
  };
};

export default connect(mapStateToProps)(EventsList);
