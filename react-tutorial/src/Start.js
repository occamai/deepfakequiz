import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Start.css';
import OneClip from './OneClip';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
const uuidv1 = require('uuid/v1');

export default class Start extends React.Component {

	constructor(props) {
		super(props);

		console.log("GUID=",props.guid);

		//var guid = uuidv1();

		this.state = {
			guid: props.guid,
			name:"", 
			age:"", 
			gender:"",

                        currentSong2: 0,
                        position2: 0,
                        volume2: 100,
                        playbackRate2: 1,
                        loop2: false,
                        playStatus2: Sound.status.STOPPED,

			//ready:"hidden",
			startDisabled:true
		};

		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleTestClick = this.handleTestClick.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEndPlay = this.handleEndPlay.bind(this);
	
	}

	/*
	componentDidMount() {

		axios.post('http://127.0.0.1:3001/df?id=3000', {
			id: 4000,
			firstName: 'Fred',
		    	lastName: 'Flintstone'
		  	})
		.then(function (response) {
		 	console.log(response);
		  })
		.catch(function (error) {
		    	console.log(error);
		});
  	}
	*/

	handleStartClick() {
                // Name
                if (this.state.name=="") {
                        alert('Please Enter A Valid Name');
                        return;
                }

                // Age
                if (this.state.age=="") {
                        alert('Please Enter A Valid Age');
                        return;
                }

                // Gender
                if (this.state.gender=="") {
                        alert('Please Enter A Valid Gender');
                        return;
                }

                const element = (
                        <div>
                                <OneClip guid={this.state.guid} name={this.state.name} gender={this.state.gender} age={this.state.age} />
                        </div>
                );
                ReactDOM.render(element, document.getElementById('root'));

  	}
	
	handleEndPlay() {
		console.log("end play");
                this.setState( {position2:0, playStatus2: Sound.status.STOPPED, startDisabled:false} )
	}

	handleTestClick() {
                this.setState( {playStatus2: Sound.status.PLAYING} );
	}

	handleNameChange(event) {
    		this.setState({name: event.target.value});
  	}
	
	handleAgeChange(event) {
    		this.setState({age: event.target.value});
  	}
	
	handleGenderChange(event) {
    		this.setState({gender: event.target.value}, () => {
      			console.log("gender=", this.state.gender);
    		});
  	}

	handleSubmit(event) {

		return;

		/*
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
				<OneClip guid={this.state.guid} />
			</div>
		);
		ReactDOM.render(element, document.getElementById('root'));

		*/

    		event.preventDefault();

  	}

	render() {
		const { volume2, playbackRate2, loop2  } = this.state;
		return (
	    		<div className="Start">
	      			<h1>Thanks for participating in the Deep Fake Quiz!</h1>
				<br />

	      			<h1>First, please fill out the following information:</h1>
				<h1></h1>
				<br />	

				<form onSubmit={this.handleSubmit}>
        				<label className="input_label">
          					Name: <input className="input_width" type="text" defaultValue={this.state.name} onChange={this.handleNameChange} />
        				</label>
        				<label className="input_label">
          					Age: <input className="input_width" type="text" defaultValue={this.state.age} onChange={this.handleAgeChange} />
        				</label>
        				<label className="input_label">
          					Gender: <input className="input_width" type="text" defaultValue={this.state.gender} onChange={this.handleGenderChange} onInput={this.handleGenderChange} />
        				</label>
					<br />	
				</form>

				<h2>Click the TEST button to check your audio.  You should hear a short clip of speech. If you don't hear it, check your settings and try again.</h2>
				<font size="30" >			
					<button style={{fontSize:"30px"}} className="center_button" onClick={this.handleTestClick} >Test</button>
				</font>

				<div>	
					<h2 >Click the START button to get started on the quiz!</h2>
		
					<font size="30" >			
						<button style={{fontSize:"30px"}} disabled={this.state.startDisabled} className="center_button" onClick={this.handleStartClick} >Start</button>
					</font>
				</div>


				<div style={{display:"none"}}>
					<PlayerControls
                                          playStatus={this.state.playStatus2}
                                          loop={loop2}
                                          onPlay={() => this.setState({ playStatus2: Sound.status.PLAYING })}
                                          onPause={() => this.setState({ playStatus2: Sound.status.PAUSED })}
                                          onResume={() => this.setState({ playStatus2: Sound.status.PLAYING })}
                                          onStop={() => this.setState({ playStatus2: Sound.status.STOPPED, position2: 0 })}
                                          onSeek={position => this.setState({ position2:position })}
                                          onVolumeUp={() => this.setState({ volume2: volume2 >= 10 ? volume2 : volume2 + 10 })}
                                          onVolumeDown={() => this.setState({ volume2: volume2 <= 0 ? volume2 : volume2 - 10 })}
                                          onPlaybackRateUp={() => this.setState({ playbackRate2: playbackRate2 >= 4 ? playbackRate2 : playbackRate2 + 0.5 })}
                                          onPlaybackRateDown={() => this.setState({ playbackRate2: playbackRate2 <= 0.5 ? playbackRate2 : playbackRate2 - 0.5 })}
                                          onToggleLoop={e => this.setState({ loop2: e.target.checked })}
                                          duration={this.state.currentSong2 ? this.state.currentSong2.duration : 0}
                                          position={this.state.position2}
                                          playbackRate={playbackRate2}
                                        />
                                        <Sound
                                              url={process.env.PUBLIC_URL + './LA_E_3549153.flac'}
                                              playStatus={this.state.playStatus2}
                                              position={this.state.position2}
                                              playFromPosition={this.state.position2}
                                              volume={volume2}
                                              playbackRate={playbackRate2}
                                              loop={loop2}
                                              onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                                              onLoad={() => console.log('Loaded')}
                                              onPlaying={({ position }) => this.setState({ position2: position })}
                                              onPause={() => console.log('Paused')}
                                              onResume={() => console.log('Resumed')}
                                              onStop={() => console.log('Stopped')}
                                              onFinishedPlaying={() => this.handleEndPlay() }
                                        />
				</div>	
			</div>
	    	);
	  }
}

					
//{this.state.isToggleOn ? 'ON' : 'OFF'}
