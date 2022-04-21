import { React } from 'react';
import '../assets/Delete.css';
import { deletePlayer, findPlayer } from '../modules/localStorage';

function Delete({
  user, play, setPlay, setLogin,
}) {
  function handlePlayAgain() {
    setPlay(true);
  }

  const p = findPlayer(user);

  function handleDelete() {
    deletePlayer(user);
    setLogin(false);
  }

  function handleLogout() {
    setLogin(false);
  }
  if (!play) {
    return (
      <div className="account">
        <h1 className="header">
          {user}
        </h1>
        <p className="score">
          {' '}
          Best Score:
          {' '}
          { p.points }
        </p>
        <div>
          <button className="button" type="submit" onClick={handleDelete}> Delete Account </button>
        </div>
        <div>
          <button className="button" type="submit" onClick={handleLogout}> Logout </button>
        </div>
        <div>
          <button className="button" type="submit" onClick={handlePlayAgain}> Back to Home </button>
        </div>
      </div>
    );
  }
}

export default Delete;
