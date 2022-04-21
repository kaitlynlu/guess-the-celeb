import { React } from 'react';
import '../assets/Leaderboard.css';
import { sortUser } from '../modules/localStorage';

function Leaderboard({ play, setPlay }) {
  const data = sortUser();
  function handlePlayAgain() {
    setPlay(true);
  }
  if (!play) {
    return (
      <div className="leaderboard">
        <h1> Top 10 Users </h1>
        <table className="center">
          <tbody>
            {data.slice(0, 10).map((item) => (
              <tr key={item.player}>
                <td>{ item.player }</td>
                <td>{ item.points }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>All Users</p>
        {data.map((item) => (
          <li key={`${item.player}__`}>{item.player}</li>
        ))}
        <div>
          <button className="button" type="submit" onClick={handlePlayAgain}> Back to Home </button>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
