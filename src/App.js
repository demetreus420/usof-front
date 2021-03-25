import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './Components/Body/Body';
import Header from './Components/Header/Header';

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

const App = () => {
  const time = useSelector((state) => state.timer);
  const timerId = useSelector((state) => state.timerId);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) return match[2];
    return undefined;
  };
  /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

  useEffect(() => {
    const interval = setInterval(
      () => dispatch({ type: 'UPDATE_TIMER', payload: new Date() }),
      600000,
    );
    dispatch({ type: 'UPDATE_TIMER_ID', payload: interval });
    dispatch({ type: 'UPDATE_TOKEN', payload: getCookie('token') });
    dispatch({ type: 'UPDATE_USER_ID', payload: getCookie('userId') });
    return () => clearInterval(timerId);
  }, []);
  /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/api/auth/check-token/${token}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.text) {
            // there text will get a boolean value
            dispatch({ type: 'UPDATE_TOKEN', payload: undefined });
          }
        });
    }
  }, [time]);
  /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

  return (
    <Router>
      <Header />
      <Body />
    </Router>
  );
};
/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default App;
