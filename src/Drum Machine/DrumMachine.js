import React, { Component } from 'react';
import './_machine.css';

// Bank Kits
const HEATER_KIT = 'Heater Kit';
const SMOOTH_PIANO_KIT = 'Smooth Piano Kit';

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPower: true,
      onDisplay: '',
      onVolume: 23,
      isBank: false
    };
  }

  handleVolumeChange = (event) => {
    this.setState({
      onVolume: event.target.value
    }, () => {
      this.setState({
        onDisplay: this.state.onVolume
      });
    });
  }

  togglePower = () => {
    this.setState({
      isPower: !this.state.isPower
    })
  }

  toggleBank = () => {
    this.setState({
      isBank: !this.state.isBank
    }, () => {
      this.setState({
        onDisplay: this.state.isBank ? SMOOTH_PIANO_KIT : HEATER_KIT
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="keypads">
          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>

          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>

          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>
          <button className="keypads__keys">Q</button>
        </div>
        <div className="controller">
          <div className="controller__power">
            <button onClick={this.togglePower}>TOGGLE POWER</button>
          </div>
          <div className="controller__display">
            <p>{this.state.onDisplay}</p>
          </div>
          <div className="controller__volume">
            <input 
              type="range" 
              step="1" min="0" max="100" 
              value={this.state.onVolume} 
              onChange={this.handleVolumeChange}
            />
          </div>
          <div className="controller__bank">
          <button onClick={this.toggleBank}>TOGGLE BANK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;