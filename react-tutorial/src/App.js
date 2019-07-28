import React from 'react';
import './App.css';
import 'process';
import Start from './Start';
import './index.css';
import global from './global';

class App extends React.Component {
	render() {
		return (
			<div className="Google">
			<h1>Deep Fake Quiz</h1>
			<br />
			<h2>Can you tell the difference between a real person speaking or a fake?</h2>
			<br />
			<h2>Deep machine learning has made it nearly impossible for you to tell the difference.  These "deep fakes" sound just like the real thing.</h2>
			<br />
			<h2>In this quiz, we will test your abilities to spot the fakes!  To get started, click to login with your google account:</h2>
			<a className="btn-google" href='/api/googlesignin'>
				<img src={require('./google.png')} className="icon-google"/>
				<span className="title-google">Sign In with Google</span>
			</a>
			</div>
		);
	}
}

export default App;
