import './App.css';
import React from 'react';

const initialState = {session: "Session",
  breakTime: 5,
  sessionTime: 25,
  isPlaying: false,
}

var myInterval

function startTimer(display, audio, sessionDiv, sessionTime, breakTime) {
  var timerString = display.textContent.split(":")
  var duration = parseInt(timerString[0], 10) * 60 + parseInt(timerString[1], 10);
  var timer = duration, minutes, seconds;
  myInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < -1) {
        clearTimeout(myInterval);
        audio.play();
        display.textContent = (sessionDiv.textContent === "Session") ? (breakTime >= 10) ? breakTime+":00":"0"+breakTime+":00":(sessionTime >= 10) ? sessionTime+":00":"0"+sessionTime+":00";
        sessionDiv.textContent = (sessionDiv.textContent === "Session") ? "Break":"Session";
        startTimer(display,audio,sessionDiv,sessionTime,breakTime);
      }
  }, 550);
  
}

function pauseTimer() {
  clearTimeout(myInterval);
}

class TwentyFiveFive extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){

    const instruction = e.target.id;
    let sessionTime = this.state.sessionTime;
    let breakTime = this.state.breakTime;

    switch(instruction){
      case 'reset':
        if(this.state.isPlaying){
          pauseTimer();
        }
        this.setState(()=>initialState);
        document.getElementById("time-left").textContent = this.state.sessionTime+":00";
        document.getElementById("timer-label").textContent = "Session";
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        return;
      case 'start_stop':
        if(this.state.isPlaying){
          pauseTimer();
        }else{
          startTimer(document.getElementById("time-left"),document.getElementById("beep"),document.getElementById("timer-label"), sessionTime, breakTime);
        }
        this.setState((prevState)=>{return{session: "Session",
          breakTime: breakTime,
          sessionTime: sessionTime,
          isPlaying: !prevState.isPlaying,}})
        break;
      case 'break-increment':
        if(breakTime < 60){
          breakTime++;
        }
        break;
      case 'break-decrement':
        if(breakTime > 1){
          breakTime--
        }
        break;
      case 'session-increment':
        if(sessionTime < 60){
          sessionTime++;
        }
        break;
      case 'session-decrement':
        if(sessionTime > 1){
          sessionTime--
        }
        break;
      default:
        return;
    }
    
    if(!this.state.isPlaying){
      this.setState((prevState)=>{return{session: "Session",
        breakTime: breakTime,
        sessionTime: sessionTime,
        isPlaying: prevState.isPlaying,}})
    }
  }

  render(){
    return <div>
      <div>
        <h2 id="break-label">Break Length</h2>
      
        <button id = "break-increment" onClick={this.handleClick}>+</button>
        <div id = "break-length">{this.state.breakTime}</div>
        <button id = "break-decrement" onClick={this.handleClick}>-</button>
      
        <h2 id="session-label">Session Length</h2>

        <button id = "session-increment" onClick={this.handleClick}>+</button>
        <div id = "session-length">{this.state.sessionTime}</div>
        <button id = "session-decrement" onClick={this.handleClick}>-</button>
      </div>

      <div>
        <h1 id = "timer-label">{this.state.session}</h1>
        <div id = "time-left">{this.state.sessionTime >= 10? this.state.sessionTime+":00":"0"+this.state.sessionTime+":00"}</div>
        <button id="start_stop" onClick={this.handleClick}>Start/Stop</button>
        <button id="reset" onClick={this.handleClick}>Reset</button>
      </div>
      <audio id = "beep"  className = "clip" src = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"></audio>
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <TwentyFiveFive />
    </div>
  );
}

export default App;
