import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };
  }

  formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  
  startTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: "work",
      time: 3, //1200
      timer: setInterval(this.tick, 1000)
    });
  };
  
  tick = () => {
    if (this.state.time === 0) {
      clearInterval(this.state.timer);
      if (this.state.status === "work") {
        this.setState({
          status: "rest",
          time: 20,
          timer: setInterval(this.tick, 1000)
        });
        this.playBell();
      } else {
        this.setState({
          status: "work",
          time: 3, //1200
          timer: setInterval(this.tick, 1000)
        });
        this.playBell();
      }
    } else {
      this.setState({
        time: this.state.time - 1
      });
    }
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: "off",
      time: 0,
      timer: null
    });
  };

  closeApp = () => {
    window.close();
  };

  render() {
    const { status, time } = this.state;

    return (
      <div>
        {status === 'off' && (
          <div>
            <h1>Protect your eyes</h1>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
            <button className="btn" onClick={this.startTimer}>Start</button>
          </div>
        )}
        {(status === 'work' || status === 'rest') && (
          <div>
            <img src={status === 'work' ? './images/work.png' : './images/rest.png'} />
            <div className="timer">{this.formatTime(time)}</div>
            <button className="btn" onClick={this.stopTimer}>Stop</button>
            <button className="btn btn-close" onClick={this.closeApp}>X</button>
          </div>
        )}
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
