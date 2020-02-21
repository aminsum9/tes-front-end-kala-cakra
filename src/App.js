import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Import Component
import Home from "./pages/Home";
import Start from "./pages/Start";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}
