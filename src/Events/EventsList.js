import React, { Component } from "react";

class EventsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   let events = this.props.events.map((event, i) => {
    //     return (
    //       <div
    //     )
    //   })
    return <p>Here's a list of upcoming events!</p>;
  }
}

export default EventsList;

// render() {
//   let homes = this.props.homes.map((home, i) => {
//     return (
//       <div className="home-display" key={i}>
//         <p className="home" key={i}>
//           {<HomeSummary home={home} onClick={this.props.onViewChange} />}
//         </p>
//       </div>
//     );
//   });
//   return (
//     <Section>
//       <div>
//         <p>{homes}</p>
//       </div>
//     </Section>
//   );
// }
// }
