import React, { Component } from 'react';

class Timer extends Component {
  zeroPad = (val) => val < 10 ? '0' + val : val;

  render() {
    return (
      <div>
        <p id="timer-label">{this.props.label}</p>
        <span id="time-left">{this.zeroPad(this.props.time.minutes) + ':' + this.zeroPad(this.props.time.seconds)}</span>
      </div>
    );
  }
}

export default Timer;