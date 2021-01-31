import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <p>hello</p>

        <Switch>
          <Route path="/about">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
