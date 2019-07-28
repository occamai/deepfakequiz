import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

import Error from "./Error";
import { GoogleLogin } from "react-google-login";
import global from "./global";
import App from "./App";
import Start from "./Start";
import "./index.css";

// Choose which experiment
if (window.location.href.indexOf("wavenet2") > 0) {
  console.log("CHOOSING AVS+WAVENET EXP");
  global.experiment = global.avs_wavenet2;
} else if (window.location.href.indexOf("wavenet") >0 ) {
  console.log("CHOOSING AVS+WAVENET");
  global.experiment = global.avs_wavenet;
} else {
  console.log("CHOOSING AVS EXP");
  global.experiment = global.avsspoof;
}

/*
if (!global.googleauth) {
  ReactDOM.render(<Start guid="999" />, document.getElementById("root"));
} else {
  ReactDOM.render(
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/start" component={Start} />
          <Redirect to="/" />
        </Switch>
      </Router>,
    document.getElementById("root")
  );
}

*/

if (!global.googleauth) {
  ReactDOM.render(<Start guid="999" />, document.getElementById("root"));
} else {
  ReactDOM.render(
    <HttpsRedirect>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/start" component={Start} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </HttpsRedirect>,
    document.getElementById("root")
  );
}
