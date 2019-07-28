import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import * as serviceWorker from './serviceWorker';

import Start from './Start';
import Error from './Error';
import { GoogleLogin } from 'react-google-login';
import global from './global';

const responseGoogleSuccess = (response) => {
  	console.log("login success=",response);
	ReactDOM.render(<Start guid={response.googleId} />, document.getElementById('root'));
}

const responseGoogleFail = (response) => {
  	console.log("login faile=",response);
	ReactDOM.render(<Error error="Google Authentication Failed." />, document.getElementById('root'));
}

// Choose which experiment
if (window.location.href.indexOf("wavenet2")>0) {
	console.log("CHOOSING AVS+WAVENET EXP 2");
	global.experiment = global.avs_wavenet2;
} else if (window.location.href.indexOf("wavenet")>0) {
	console.log("CHOOSING AVS+WAVENET EXP");
	global.experiment = global.avs_wavenet;
} else {
	console.log("CHOOSING AVS EXP");
	global.experiment = global.avsspoof;
}

// Chrome 1 - 71
//const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
//console.log("ISCHROME", isChrome , window.chrome );
//if (!isChrome) {
//
/// ReactDOM.render(<Error error="Only the Google Chrome browser is supported." />, document.getElementById('root'));
//
//} else 
if (!global.googleauth) {

	ReactDOM.render(
		<Start guid="999" />,
		document.getElementById('root'));

} else {

	ReactDOM.render(
		<div className="Google">
			<h1>Deep Fake Quiz</h1>
			<br />
			<h2>Can you tell the difference between a real person speaking or a fake?</h2>
			<br />
			<h2>Deep machine learning has made it nearly impossible for you to tell the difference.  These "deep fakes" sound just like the real thing.</h2>
			<br />
			<h2>In this quiz, we will test your abilities to spot the fakes!  To get started, click to login with your google account:</h2>
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
