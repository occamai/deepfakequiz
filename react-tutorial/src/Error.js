import React from 'react';
import ReactDOM from 'react-dom';
import './Error.css';

export default class Error extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			error: props.error
		};
	}

	render() {
		return (
	    		<div className="Error" >
	      			<h1>Sorry An Error Occurred</h1>
				<h1>{this.state.error}</h1>
				<br />
			</div>
	    	);
	  }
}

