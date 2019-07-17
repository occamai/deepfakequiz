import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'process';
import Start from './Start';

class App extends React.Component {

	constructor(props) {

		console.log("APP INIT");

		super(props);

	  	this.state = {
	    		isAuthenticated: false
	  	};
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
				</header>
			</div>
		);
	}
}

export default App;
