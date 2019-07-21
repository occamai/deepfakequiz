import React from 'react';
import './CompareClips.css';
import 'process';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import Done from './Done'
import global from './global'

class CompareClips extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

			guid: props.guid, 
			name: props.name,
			age: props.age,
			gender: props.gender,
			one_results: props.results,

			trial:0,
			last_trials:props.last_trials,
			max:0, 

			startDisabled: true,

			controlled1: true,
			currentSong1: 0,
			position1: 0,
			volume1: 100,
			playbackRate1: 1,
			loop1: false,
			playStatus1: Sound.status.STOPPED,
			
			controlled2: true,
			currentSong2: 0,
			position2: 0,
			volume2: 100,
			playbackRate2: 1,
			loop2: false,
			playStatus2: Sound.status.STOPPED,

			nextDisabled: true,
			doneDisabled: true,
		
			checked: null,
			firstRadioDisabled: true,
			secondRadioDisabled: true,

			script: null,
			play1: null,
			play2: null,

			results:[]
		};
	                
		// This binding is necessary to make `this` work in the callback
                this.startClicked = this.startClicked.bind(this);
                this.playFirst = this.playFirst.bind(this);
		this.handleEndPlayFirst = this.handleEndPlayFirst.bind(this);
                this.playSecond = this.playSecond.bind(this);
		this.handleEndPlaySecond = this.handleEndPlaySecond.bind(this);
		this.nextClicked = this.nextClicked.bind(this);
		this.handleFirstChange = this.handleFirstChange.bind(this);
		this.handleSecondChange = this.handleSecondChange.bind(this);
	}

        componentDidMount() {
                this.setState({ isLoading: true });

                fetch( global.experiment + "/exp/SCRIPT.json")
                   .then( response => {
                                if (response.ok) {
                                        //console.log("YES!", response);
                                        var js = response.json();
                                        js.then( data => this.setState({ script: data, max: data["1"].length + data["2"].length }, () => { this.setState({ startDisabled:false }) } ) );
                                        return js;
                                } else {
                                        throw new Error('Something went wrong ...');
                                }
                   })
        }
	
	startClicked() {
		//console.log( "script", this.state.script );
		this.setState( {startDisabled:true} )
		this.setState( {position1:0, play1: this.state.script["2"][this.state.trial][0] } )
		this.setState( {position2:0, play2: this.state.script["2"][this.state.trial][1] } )
		this.props.setTimeout(this.playFirst,1000);
	}

	playFirst() {
		this.setState( {playStatus1: Sound.status.PLAYING} );
	}

	handleEndPlayFirst() {
		this.setState({ playStatus1: Sound.status.STOPPED} );
		this.props.setTimeout(this.playSecond,1000)
	}
	
	playSecond() {
		this.setState( {playStatus2: Sound.status.PLAYING} );
	}
	
	handleEndPlaySecond() {
		this.setState({ playStatus2: Sound.status.STOPPED} );
		this.setState({ nextDisabled: false })
		this.setState({ doneDisabled: false })
		this.setState({ firstRadioDisabled: false, secondRadioDisabled: false} );
	}

	nextClicked() {
		if ( this.state.checked==null) {
			alert('Please make a choice!');
			return;
		} else {
				
			this.setState( { nextDisabled: true, 	
						doneDisabled: true, 
						startDisabled: false, 
						checked:null, 
						firstRadioDisabled:true, 
						secondRadioDisabled:true,
						trial: this.state.trial+1,
						results: this.state.results.concat([ this.state.checked]) },
						
						()  => 
				{ 
					//console.log("DONE SETSTATE", this.state.results)
					if ( this.state.trial >= (this.state.script["2"].length) ) {
						const element = (
							<div>
								<Done guid={this.state.guid} name={this.state.name} gender={this.state.gender} age={this.state.age} one_results={this.state.one_results} results={this.state.results} />
							</div>
						);
						ReactDOM.render(element, document.getElementById('root'));
					}
				});
		}
	}
	
	handleFirstChange(event) {
                //console.log( "first",event.target.value );
		this.setState( {checked: event.target.value} );
        }
	
	handleSecondChange(event) {
                //console.log( "second",event.target.value );
		this.setState( {checked: event.target.value} );
        }

	render() {
		const { volume1, playbackRate1, loop1, volume2, playbackRate2, loop2  } = this.state;

		return (
			<div className="CompareClips">
				<h1>Deep Fake Quiz: {this.state.last_trials + this.state.trial+1} of {this.state.max} </h1>
				<br />
				<h2>In this exercise, you will hear two short clips from different people.  One of them is real, this other is a deep fake.  Can you tell which one is fake?  </h2>
				<br />
				<h2>When you are ready, click START to hear them. The clips will be played only once!</h2>
				<br />
				<button style={{fontSize:"30px"}} className="abutton" onClick={this.startClicked} disabled={this.state.startDisabled} >START</button>
				<div style={{display:"none"}} >
					<PlayerControls	
					  playStatus={this.state.playStatus1}
					  loop={loop1}
					  onPlay={() => this.setState({ playStatus1: Sound.status.PLAYING })}
					  onPause={() => this.setState({ playStatus1: Sound.status.PAUSED })}
					  onResume={() => this.setState({ playStatus1: Sound.status.PLAYING })}
					  onStop={() => this.setState({ playStatus1: Sound.status.STOPPED, position1: 0 })}
					  onSeek={position => this.setState({ position1:position })}
					  onVolumeUp={() => this.setState({ volume1: volume1 >= 10 ? volume1 : volume1 + 10 })}
					  onVolumeDown={() => this.setState({ volume1: volume1 <= 0 ? volume1 : volume1 - 10 })}
					  onPlaybackRateUp={() => this.setState({ playbackRate1: playbackRate1 >= 4 ? playbackRate1 : playbackRate1 + 0.5 })}
					  onPlaybackRateDown={() => this.setState({ playbackRate1: playbackRate1 <= 0.5 ? playbackRate1 : playbackRate1 - 0.5 })}
					  onToggleLoop={e => this.setState({ loop1: e.target.checked })}
					  duration={this.state.currentSong1 ? this.state.currentSong1.duration : 0}
					  position={this.state.position1}
					  playbackRate={playbackRate1}
					/>
					<Sound
					      url={process.env.PUBLIC_URL + './' + this.state.play1}
					      playStatus={this.state.playStatus1}
					      position={this.state.position1}
					      playFromPosition={this.state.position1}
					      volume={volume1}
					      playbackRate={playbackRate1}
					      loop={loop1}
					      onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
					      onLoad={() => console.log('Loaded')}
					      onPlaying={({ position }) => this.setState({ position1: position })}
					      onPause={() => console.log('Paused')}
					      onResume={() => console.log('Resumed')}
					      onStop={() => console.log('Stopped')}
					      onFinishedPlaying={() => this.handleEndPlayFirst() }
					/>
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
					      url={process.env.PUBLIC_URL + './' + this.state.play2}
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
					      onFinishedPlaying={() => this.handleEndPlaySecond() }
					/>
				</div>
				<br />
				<h2>Now, which clip do you think is the fake one?</h2>
				<form>
					<label style={{fontSize:"20px"}} >
						<input type="radio" value="1" name="fakeit" disabled={this.state.firstRadioDisabled} checked={this.state.checked==="1"} onChange={this.handleFirstChange} />      
						First Clip Is Fake
					</label>
					<br />
					<label style={{fontSize:"20px"}} >
						<input type="radio" value="2" name="fakeit" disabled={this.state.secondRadioDisabled} checked={this.state.checked==="2"} onChange={this.handleSecondChange} />
						Second Clip Is Fake
					</label>
				</form>

				<br />
				<button style={{fontSize:"30px"}} className="abutton" onClick={ function(obj) {return obj.nextClicked; }(this)  } disabled={this.state.nextDisabled} >NEXT</button>
			</div>
    		)
  	}
}

export default ReactTimeout(CompareClips);
