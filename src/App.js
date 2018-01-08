import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  // class App extends Component {
  //   render() {
  //     return (

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
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/*" render={() => <Redirect to="/home" />} />
      </Switch>
    </div>
  </Router>
);
//   }
// }

export default App;
