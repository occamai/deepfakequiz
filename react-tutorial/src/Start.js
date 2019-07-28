import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import global from './global';
import './Start.css';
import OneClip from './OneClip';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
//const uuidv1 = require('uuid/v1');
// var soundFile = require('/LA_E_3549153.flac');
import soundFile from '../public/LA_E_3549153.flac';

export default class Start extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      guid: 0,
      name: "",
      age: "",
      gender: "",

      currentSong2: 0,
      position2: 0,
      volume2: 100,
      playbackRate2: 1,
      loop2: false,
      playStatus2: Sound.status.STOPPED,

      startDisabled: true
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleTestClick = this.handleTestClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleEndPlay = this.handleEndPlay.bind(this);
  }

  componentDidMount() {

    // This is a dummy get to validate the connection to the post server
    var self = this
    axios.get(global.posturl + '/api/getUser')
      .then(function (response) {
        console.log("SERVER OK", response);
        self.setState({guid: response.data.id})
      })
      .catch(function (error) {
        console.log("SERVER FAIL", error);
      });
  }

  handleStartClick() {
    // Name
    if (this.state.name === "") {
      alert('Please Enter A Valid Name');
      return;
    }

    // Age
    if (this.state.age === "") {
      alert('Please Enter A Valid Age');
      return;
    }

    // Gender
    if (this.state.gender === "") {
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
    //console.log("end play");
    this.setState({ position2: 0, playStatus2: Sound.status.STOPPED, startDisabled: false })
  }

  handleTestClick() {
    this.setState({ playStatus2: Sound.status.PLAYING });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAgeChange(event) {
    this.setState({ age: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({ gender: event.target.value }, () => {
      //console.log("gender=", this.state.gender);
    });
  }

  handleSubmit(event) {

    event.preventDefault();

    return;

  }

  render() {
    const { volume2, playbackRate2, loop2 } = this.state;
    return (
      <div className="Start">
        <h1>Thanks for participating in the Deep Fake Quiz!</h1>
        <br />

        <h1>First, please fill out the following information:</h1>
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

        <h2>Click the TEST button to check your audio.  You should hear a short clip of speech. If you don't hear it, check your settings and try again. Use a Google Chrome browser (not on a mobile device) for the best results.</h2>
        <font size="30" >
          <button style={{ fontSize: "30px" }} className="center_button" onClick={this.handleTestClick} >Test</button>
        </font>

        <div>
          <h2 >Click the START button to get started on the quiz!</h2>

          <font size="30" >
            <button style={{ fontSize: "30px" }} disabled={this.state.startDisabled} className="center_button" onClick={this.handleStartClick} >Start</button>
          </font>
        </div>


        <div style={{ display: "none" }}>
          <PlayerControls
            playStatus={this.state.playStatus2}
            loop={loop2}
            onPlay={() => this.setState({ playStatus2: Sound.status.PLAYING })}
            onPause={() => this.setState({ playStatus2: Sound.status.PAUSED })}
            onResume={() => this.setState({ playStatus2: Sound.status.PLAYING })}
            onStop={() => this.setState({ playStatus2: Sound.status.STOPPED, position2: 0 })}
            onSeek={position => this.setState({ position2: position })}
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
            url={soundFile}
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
            onFinishedPlaying={() => this.handleEndPlay()}
          />
        </div>
      </div>
    );
  }
}


//{this.state.isToggleOn ? 'ON' : 'OFF'}
