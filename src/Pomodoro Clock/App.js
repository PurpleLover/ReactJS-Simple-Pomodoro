import React, { Component } from 'react';
import './App.css';
import Timer from './Component/Timer';

// import {} from '../src/Common/constant';

const BREAK = 'breakLength';
const SESSION = 'sessionLength';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const SOUND_URL = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav';

const audioElement = document.createElement('audio');
audioElement.setAttribute('src', SOUND_URL);
audioElement.setAttribute('id', 'beep')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: this.getRemainingTime(5),
      inteval: null,
      phase: 'Session',
      step: 0,
      countdown: false,
      notif: '',
    };
  }
  //cate: break/session
  //type: increment/decrement
  _handleChange = (type, cate) => {
    this.setState({
      [cate]: type === INCREMENT ? this.state[cate] + 1 : this.state[cate] - 1,
    }, () => {
      if (cate === SESSION) {
        this.setState({
          timeLeft: this.getRemainingTime(this.state.sessionLength * 60)
        });
      }
    });
  }

  _reset = () => {
    this._handleStopTimer();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: this.getRemainingTime(1500),
    });
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  getRemainingTime = (s) => {
    const total = s,
      minutes = Math.floor(total / 60 % 60),
      seconds = Math.floor(total % 60);
    return { total, minutes, seconds };
  }

  nextPhase = () => {
    this._handleStopTimer();
    let step = this.state.step + 1;
    audioElement.play();
    this.setState({
      step,
      timeLeft: (step % 2 === 0)
        ? this.getRemainingTime(this.state.sessionLength * 60+1)
        : this.getRemainingTime(this.state.breakLength * 60+1)
    });
    this._handleStartTimer();
  }

  displayTime = () => {
    if (this.state.timeLeft.total > 0) {
      let timeLeft = this.getRemainingTime(
        this.state.timeLeft.total - 1
      );
      this.setState({
        timeLeft
      });
    } else {
      this.nextPhase();
    }
  }

  startTimer = () => {
    this.displayTime();
    this.setState({
      inteval: setInterval(this.displayTime, 1000)
    });
  }

  _handleStopTimer = () => {
    clearInterval(this.state.inteval);
    this.setState({
      inteval: null,
      countdown: false
    });
  }

  _handleStartTimer = () => {
    this.setState({
      phase: (this.state.step % 2 === 0) ? 'Session' : 'Break',
      countdown: true
    });
    this.startTimer();
  }

  toggleCountDown = () => {
    if (!this.state.inteval) {
      this._handleStartTimer();
    } else {
      this._handleStopTimer();
    }
  }



  render() {
    return (
      <div className="App">
        <h1 className="App-title">Pomodoro Clock</h1>
        <div className="App-setup">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className="App-time">
              <button
                onClick={this._handleChange.bind(this, INCREMENT, BREAK)}
                id='break-increment'
                disabled={(this.state.breakLength === 60 || this.state.countdown) && true}
              >
                Break Increment
            </button>
              <p id="break-length">{this.state.breakLength}</p>
              <button
                onClick={this._handleChange.bind(this, DECREMENT, BREAK)}
                id='break-decrement'
                disabled={(this.state.breakLength === 1 || this.state.countdown) && true}
              >
                Break Decrement
            </button>
            </div>
          </div>

          <div>
            <h3 id="session-label">Session Length</h3>
            <div className="App-time">
              <button
                onClick={this._handleChange.bind(this, INCREMENT, SESSION)}
                id='session-increment'
                disabled={(this.state.sessionLength === 60 || this.state.countdown) && true}
              >
                Session Increment
            </button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button
                onClick={this._handleChange.bind(this, DECREMENT, SESSION)}
                id='session-decrement'
                disabled={(this.state.sessionLength === 1 || this.state.countdown) && true}
              >
                Session Decrement
             </button>
            </div>
          </div>
        </div>

        <Timer 
          label={this.state.phase}
          time={this.state.timeLeft}  
        />

        <div>
          <button onClick={this.toggleCountDown} id="start_stop">START/STOP</button>
          <button onClick={this._reset} id="reset">RESET</button>
        </div>
        <audio id="beep">
        </audio>
      </div>
    );
  }
}

export default App;
