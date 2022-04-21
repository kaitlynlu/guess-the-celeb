import { React, useState, useRef } from 'react';
import Questions from './Questions';
import Leaderboard from './Leaderboard';
import '../assets/App.css';
import questionsList from '../assets/questions.json';
import Delete from './Delete';

function App({ username, login, setLogin }) {
  // initialize state, the game hasn't started yet
  const [, setStarted] = useState(false);
  const [, setLeaderboard] = useState(false);
  const [, setAcctState] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  // Keep track of the state of the game (started or not)
  const start = useRef(false);
  const leaderboard = useRef(false);
  const viewAcct = useRef(false);

  function handleStart() {
    setPlayAgain(false);
    setStarted(true);
    // update start
    start.current = true;
  }

  function handleLeaderboard() {
    setLeaderboard(true);
    setPlayAgain(false);
    leaderboard.current = true;
    start.current = false;
    viewAcct.current = false;
  }

  function handleDelete() {
    setAcctState(true);
    setPlayAgain(false);
    viewAcct.current = true;
    start.current = false;
    leaderboard.current = false;
  }
  if ((!leaderboard.current && !start.current && !viewAcct.current) || playAgain) {
    return (
      <div>
        <div className="welcome">
          <h1>
            Welcome
            {' '}
            {username}
            !
          </h1>
        </div>
        <div>
          <button className="button" type="submit" onClick={handleStart}> Begin Game </button>
        </div>
        <div>
          <button className="button" type="submit" onClick={handleLeaderboard}> Leaderboard </button>
        </div>
        <div>
          <button className="button" type="submit" onClick={handleDelete}> View Account </button>
        </div>
      </div>
    );
  } if (start.current) {
    return (
      <div>
        <Questions
          questionslist={questionsList}
          player={username}
          play={playAgain}
          setPlay={setPlayAgain}
        />
      </div>
    );
  } if (leaderboard.current) {
    return (
      <div>
        <Leaderboard play={playAgain} setPlay={setPlayAgain} />
      </div>
    );
  } if (viewAcct.current) {
    return (
      <div>
        <Delete
          user={username}
          play={playAgain}
          setPlay={setPlayAgain}
          login={login}
          setLogin={setLogin}
        />
      </div>
    );
  }
}

export default App;
