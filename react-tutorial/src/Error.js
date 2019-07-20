import React from 'react';
import ReactDOM from 'react-dom';
import './Error.css';

export default class Error extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
	    		<div className="Error" >
	      			<h1>Sorry An Error Occurred</h1>
				<br />
			</div>
	    	);
	  }
}

