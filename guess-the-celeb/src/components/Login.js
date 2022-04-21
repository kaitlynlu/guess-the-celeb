import { React, useState, useRef } from 'react';
import App from './App';
import '../assets/Login.css';
import { getUser, addUser } from '../modules/localStorage';

function Login() {
  // eslint-disable-next-line prefer-const
  let username = useRef('');
  const [login, setLoggedIn] = useState(false);
  const [, setTryAgain] = useState(false);
  const tryAgain = useRef(false);

  function handleOnChange(e) {
    username.current = e.target.value;
  }

  function handleLogin() {
    if (/[^0-9a-zA-Z]/.test(username.current) || username.current === '' || username === null) {
      // then it haas non alphanumeric characters and we need an error statement
      setTryAgain(true);
      tryAgain.current = true;
    } else {
      let users = getUser();
      const name = username.current;
      if (users == null) {
        users = [];
      }
      const exists = users.some((v) => (v.player === name));
      if (!exists) {
        // create a new account and append it to the local storage
        addUser(username, users);
        setLoggedIn(true);
        setTryAgain(false);
        tryAgain.current = false;
      } else { // username alrerady exists - get started
        setLoggedIn(true);
        setTryAgain(false);
        tryAgain.current = false;
      }
    }
  }

  if (!tryAgain.current && !login) {
    return (
      <div>
        <div className="text">
          <h1>Guess the Celebrity! </h1>
        </div>
        <div className="login">
          <p>Username </p>
          <input type="text" onChange={handleOnChange} />
        </div>
        <div>
          <button className="button" type="submit" onClick={handleLogin}> Login </button>
        </div>
      </div>
    );
  } if (tryAgain.current && !login) {
    return (
      <div>
        <div className="title">
          <h1>Guess the Celebrity! </h1>
        </div>
        <div className="error">
          <h3>Your username cannot contain non-alphanumeric characters, please try again. </h3>
        </div>
        <div className="login">
          <p>Username</p>
          <input type="text" onChange={handleOnChange} />
        </div>
        <div>
          <button className="button" type="submit" onClick={handleLogin}> Login </button>
        </div>
      </div>
    );
  } if (login) {
    return (
      <div>
        <App username={username.current} login={login} setLogin={setLoggedIn} />
      </div>
    );
  } return (
    <p> hi</p>
  );
}
export default Login;
