import React from 'react';
import ReactDOM from 'react-dom';
import './Done.css';

export default class Done extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
	    		<div className="Done" >
	      			<h1>Thanks for participating in the Deep Fake Quiz!</h1>
				<br />
	      			<h1>We will email your scores to you after the tournament ends.</h1>
			</div>
	    	);
	  }
}

