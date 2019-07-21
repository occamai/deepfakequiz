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

//console.log("PROCESS AUTH=", process.env.REACT_APP_AUTH, process.env.PORT);

// Chrome 1 - 71
//const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
//console.log("ISCHROME", isChrome , window.chrome );
//if (!isChrome) {
//
//ReactDOM.render(<Error error="Only the Google Chrome browser is supported." />, document.getElementById('root'));
//
//} else 
	
if (!global.googleauth) {

	ReactDOM.render(
		<Start guid="999" />,
		document.getElementById('root'));

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
