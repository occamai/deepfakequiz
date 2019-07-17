import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Start from './Start';
import CompareClips from './CompareClips';

/*
const routing = (
  <Router>
    <Start />
    <div>
      <Route exact path="/start" component={Start} />
      <Route exact path="/compare" component={CompareClips} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
*/

ReactDOM.render(<Start />, document.getElementById('root'));

/*

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
