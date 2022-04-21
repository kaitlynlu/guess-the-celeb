import {
  React, useState, useRef,
} from 'react';
import '../assets/Questions.css';
import { findPlayer, sortUser, updateUser } from '../modules/localStorage';

function Questions({
  questionslist, player, play, setPlay,
}) {
  const [counter, setCounter] = useState(0);
  // pick a question
  const qNum = Math.floor(Math.random() * 20) % 20;
  const question = questionslist[qNum];
  const [asked, setAsked] = useState([]);
  const gameOver = useRef(false);
  const score = useRef(0);
  let data = sortUser();
  const p = findPlayer(player);

  function handleSubmit(e) {
    e.preventDefault();
    setAsked([...asked, qNum]);
    setCounter(counter + 1);
    if (counter === 9) {
      gameOver.current = true;
      // update best score
      if (p.points < score.current) {
        data = data.filter((item) => item.player !== player);
        const entry = {
          player,
          points: score.current,
        };
        data.push(entry);
        updateUser(data);
      }
    }
  }

  function handlePlayAgain() {
    setPlay(true);
  }

  function handleOnChange(e) {
    if (e.target.value === question.correct) {
      score.current += 1;
    }
  }

  if (!gameOver.current && !play) {
    const check = asked.includes(qNum);
    if (check) {
      setCounter(counter); // basically just re-render
    }
    return (
      <div>
        <div>
          {player}
          :
          {' '}
          {score.current}
          /10
        </div>
        <div>
          Your Best Score:
          {' '}
          {player}
          {'     -     '}
          {p.points}
        </div>
        <div>
          {data.slice(0, 1).map((item) => (
            <div key={item.player}>
              All-Time Best Score:
              {' '}
              {item.player}
              {'     -     '}
              {item.points}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {' '}
          Question #
          {counter + 1}
          {' '}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <img src={question.img} alt="hello" width="180" height="200" />
        </div>
        <form className="qstns">
          <div className="radio">
            <label htmlFor="ans1">
              <input type="radio" id="ans1" name="ans" value={question.option1} onChange={handleOnChange} />
              {question.option1}
            </label>
          </div>
          <div className="radio">
            <label htmlFor="ans2">
              <input type="radio" id="ans2" name="ans" value={question.option2} onChange={handleOnChange} />
              {question.option2}
            </label>
          </div>
          <div className="radio">
            <label htmlFor="ans3">
              <input type="radio" id="ans3" name="ans" value={question.option3} onChange={handleOnChange} />
              {question.option3}
            </label>
          </div>
          <div className="radio">
            <label htmlFor="ans4">
              <input type="radio" id="ans4" name="ans" value={question.option4} onChange={handleOnChange} />
              {question.option4}
            </label>
          </div>
        </form>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <button type="submit" onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Check Answer </button>
        </div>
      </div>

    );
  } if (gameOver.current && !play) {
    return (
      <div>
        <div>
          <h1> Game Over! </h1>
          <div>
            Final Score:
            {' '}
            {score.current}
            /10
          </div>
        </div>
        <div>
          <button type="submit" onClick={handlePlayAgain}> Back to Home </button>
        </div>
      </div>
    );
  }
}

export default Questions;
