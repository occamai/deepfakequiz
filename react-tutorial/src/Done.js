import React from 'react';
import ReactDOM from 'react-dom';
import './Done.css';
import axios from 'axios';
import global from './global';

export default class Done extends React.Component {

	constructor(props) {
		super(props);

		console.log("DGUID=", props.guid);

		this.state = {
			guid: props.guid,
			name: props.name,
			age: props.age,
			gender: props.gender,
			one_results: props.one_results,
			results: props.results
		}
	}

        componentDidMount() {
               
		console.log("SENDING RESULTS");

		//axios.post('http://127.0.0.1:3001/df?id=3000', {
		axios.post( global.posturl + '/df?id=3000', {
			id: this.state.guid,
			name: this.state.name,
			age: this.state.age,
			gender: this.state.gender,
			one_results: this.state.one_results,
			results: this.state.results,
			experiment: global.experiment
		})
		.then(function (response) {
			console.log("DONE send",response);
		})
		.catch(function (error) {
			console.log(error);
		});
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

