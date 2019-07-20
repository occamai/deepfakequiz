import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Start from './Start';
import CompareClips from './CompareClips';
import Error from './Error';
import { GoogleLogin } from 'react-google-login';
import process from 'process';

const responseGoogleSuccess = (response) => {
  	console.log("login success=",response);
	ReactDOM.render(<Start guid={response.googleId} />, document.getElementById('root'));
}

const responseGoogleFail = (response) => {
  	console.log("login faile=",response);
	ReactDOM.render(<Error />, document.getElementById('root'));
}

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

console.log("PROCESS AUTH=", process.env.REACT_APP_AUTH, process.env.PORT);

if (false) {

	ReactDOM.render(<Start guid="999" />, document.getElementById('root'));

} else {

	ReactDOM.render(
		<div className="Google">
			<h1>Click To Login Using Your Google Account:</h1>
			<GoogleLogin
			    clientId="199718064485-gm6lbrk6n4fmn991oe2osqihpu3rrbnc.apps.googleusercontent.com"
			    buttonText="Login"
			    onSuccess={responseGoogleSuccess}
			    onFailure={responseGoogleFail}
			    cookiePolicy={'single_host_origin'}
		  	/>
		</div>,
	  document.getElementById('root')
	);

}
