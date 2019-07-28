import React from 'react';
import './Done.css';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import global from './global';
export default class Done extends React.Component {

  constructor(props) {
    super(props);

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
    axios.post(global.posturl + '/api/df', {
      id: this.state.guid,
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      one_results: this.state.one_results,
      results: this.state.results,
      experiment: global.experiment,
      nonce: global.nonce
    })
      .then(function (response) {
        console.log("RESULTS SENT", response);
      })
      .catch(function (error) {
        console.log("SEND ERROR", error);
      });
  }

  render() {
    return (
      <div className="Done" >
        <h1>Thanks for participating in the Deep Fake Quiz!</h1>
        <br />
        <h1>We will email your scores to you after the tournament ends.</h1>
        <br />
        <a className="btn-google" href='/api/googlelogout'>
          <img src={require('./google.png')} className="icon-google" />
          <span className="title-google">Log Out with Google</span>
        </a>
      </div>
    );
  }
}

