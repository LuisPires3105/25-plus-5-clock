import './App.css';
import { useState } from 'react';

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
  }, 200);
  
}

function pauseTimer() {
  clearTimeout(myInterval);
}

function App() {

  const [session, setSession] = useState("Session")
  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime, setSessionTime] = useState(25)
  const [isPlaying, setIsPlaying] = useState(false)

  function incBreakHandleClick(){
    if(!isPlaying){
      breakTime < 60 ? setBreakTime(breakTime+1):setBreakTime(60);
    }
  }

  function decBreakHandleClick(){
    if(!isPlaying){
      breakTime > 1 ? setBreakTime(breakTime-1): setBreakTime(1);
    }
  }

  function incSessHandleClick(){
    if(!isPlaying){
      sessionTime < 60 ? setSessionTime(sessionTime+1):setSessionTime(60); 
    }
  }

  function decSessHandleClick(){
    if(!isPlaying){
      sessionTime > 1 ? setSessionTime(sessionTime-1):setSessionTime(1);
    }
  }

  function startStopHandleClick(){

    if(isPlaying){
      pauseTimer();
    }else{
      startTimer(document.getElementById("time-left"),document.getElementById("beep"),document.getElementById("timer-label"), sessionTime, breakTime);
    }
    setIsPlaying(!isPlaying);
  }

  function resetHandleClick(){
    if(isPlaying){
      pauseTimer()
    }
    setSession("Session")
    setBreakTime(5)
    setSessionTime(25)
    setIsPlaying(false)
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("time-left").textContent = sessionTime+":00";
    document.getElementById("timer-label").textContent = "Session";
  }

  return (
    <div className="App">
      <div>
        <div>
          <h2 id="break-label">Break Length</h2>
        
          <button id = "break-increment" onClick={incBreakHandleClick}>+</button>
          <div id = "break-length">{breakTime}</div>
          <button id = "break-decrement" onClick={decBreakHandleClick}>-</button>
        
          <h2 id="session-label">Session Length</h2>

          <button id = "session-increment" onClick={incSessHandleClick}>+</button>
          <div id = "session-length">{sessionTime}</div>
          <button id = "session-decrement" onClick={decSessHandleClick}>-</button>
        </div>

        <div>
          <h1 id = "timer-label">{session}</h1>
          <div id = "time-left">{sessionTime >= 10? sessionTime+":00":"0"+sessionTime+":00"}</div>
          <button id="start_stop" onClick={startStopHandleClick}>Start/Stop</button>
          <button id="reset" onClick={resetHandleClick}>Reset</button>
        </div>
        <audio id = "beep"  className = "clip" src = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"></audio>
      </div>
    </div>
  );
}

export default App;
