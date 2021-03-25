import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {StyledSubmit} from "../Styled/StyledHeader";

const StyledLogin = styled.div`
  width: 100%;
  padding: 30px;
  height: 500px;

  form {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    input {
      height: 35px;
      width: 200px;
      border: 2px solid silver;
      padding: 0 10px 0 10px;
      background-color: white;
      transition: all 0.5s ease-out;
      margin-left: 10px;
    }
    label {
      font-weight: bold;
    }
    div {
      width: 300px;
    }
  }
`;

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [err, setErr] = useState([]);
  const dispatch = useDispatch();

  function onChangeField(setFunc) {
    return ({ target }) => setFunc(target.value);
  }

  useEffect(() => {
    if (auth) {
      document.cookie = `token=${userInfo.token};`;
      document.cookie = `userId=${userInfo.userId};`;
      document.cookie = 'samesite=strict; max-age=3600;';
      dispatch({ type: 'UPDATE_TOKEN', payload: userInfo.token });
      dispatch({ type: 'UPDATE_USER_ID', payload: userInfo.userId });
    }
  }, [auth, userInfo]);

  async function signIn(event) {
    event.preventDefault();
    await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        login,
        password,
        email: login,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        let resAuth = false;
        let resInfo = {};
        let error = '';

        if (!result.text) {
          resAuth = true;
          resInfo = result;
        } else {
          error = result.text;
        }

        setUserInfo(() => resInfo);
        setAuth(() => resAuth);
        setErr(() => [error]);
      });
  }

  return (
    <StyledLogin>
      <form onSubmit={signIn}>
        <div>
          <label htmlFor="login">Login : </label>
          <input
            id="login"
            name="loginName"
            onChange={ onChangeField(setLogin) }
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            name="passwordName"
            onChange={ onChangeField(setPassword) }
            type="password"
          />
        </div>
        <StyledSubmit value="Sign in" />
      </form>
      {err.map((elem, index) => (
        <div className="response" key={ `${index + 1}err` }>
          {elem}
        </div>
      ))}
    </StyledLogin>
  );
};

export default Login;
