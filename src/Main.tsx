import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Shipping from "./components/Shipping";

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/checkout" component={Shipping} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
