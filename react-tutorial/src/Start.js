import React from 'react';
import ReactDOM from 'react-dom';
import CompareClips from './CompareClips';
const uuidv1 = require('uuid/v1');

export default class Start extends React.Component {

	constructor(props) {
		super(props);

		var guid = uuidv1();

		this.state = {guid: guid, name:"", age:"", gender:""};

		console.log("GUID=",guid);

		this.handleClick = this.handleClick.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClick() {

		const element = (
			<div>
				<CompareClips guid={this.state.guid} />
			</div>
		);
		ReactDOM.render(element, document.getElementById('root'));
  	}

	handleNameChange(event) {
    		this.setState({name: event.target.value});
  	}
	
	handleAgeChange(event) {
    		this.setState({age: event.target.value});
  	}
	
	handleGenderChange(event) {
    		this.setState({gender: event.target.value});
  	}

	handleSubmit(event) {

		// Name
		if (this.state.name=="") {
			alert('Please Enter A Valid Name');
    			event.preventDefault();
			return;
		} 

		// Age
		if (this.state.age=="") {
			alert('Please Enter A Valid Age');
    			event.preventDefault();
			return;
		}
		
		// Gender
		if (this.state.gender=="") {
			alert('Please Enter A Valid Gender');
    			event.preventDefault();
			return;
		}

		const element = (
			<div>
				<CompareClips guid={this.state.guid} />
			</div>
		);
		ReactDOM.render(element, document.getElementById('root'));

    		event.preventDefault();

  	}

	render() {
		return (
	    		<div>
	      			<h1>Thanks for participating in the Deep Fake Quiz!</h1>
				<br />

	      			<h1>First, please fill out the following information:</h1>
				<h1></h1>
				<br />	

				<form onSubmit={this.handleSubmit}>
        				<label>
          					Name: <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange} />
        				</label>
					<br />	
					<br />	
					<br />	
        				<label>
          					Age: <input type="text" defaultValue={this.state.age} onChange={this.handleAgeChange} />
        				</label>
					<br />	
					<br />	
					<br />	
        				<label>
          					Gender: <input type="text" defaultValue={this.state.gender} onChange={this.handleGenderChange} />
        				</label>
	      		
					<br />	
					<br />	
					<br />	
					<h2>Now click this button to start the quiz!</h2>
        				
					<input type="submit" value="Submit" />

				</form>
			</div>
	    	);
	  }
}

					
//{this.state.isToggleOn ? 'ON' : 'OFF'}
