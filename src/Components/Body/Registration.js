import React, { useState } from 'react';
import styled from 'styled-components';

const StyledLogin = styled.div`
  *:hover,
  *:active {
    border-color: white;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    -ms-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
  }

  width: 100%;
  padding: 30px;
  height: 100%;

  .signUp {
    width: 100%;
    margin: 0;
  }

  .response {
    color: red;
    font-weight: bold;
    text-decoration: underline;
    padding: 10px;
    margin-top: 20px;
    height: 10px;
    text-shadow: 0px 0px 3px red;
  }
  form {
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    input {
      height: 35px;
      width: 300px;
      border: 5px solid silver;
      padding: 0 10px 0 10px;
      background-color: white;
      transition: all 0.5s ease-out;
      margin-left: 10px;
    }
    label {
      font-weight: bold;
    }
    div {
      height: 100px;
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Registration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [err, setErr] = useState([]);
  const [success, setSuccess] = useState(false)

  function onChangeField(setFunc) {
    return ({ target }) => setFunc(target.value);
  }

  async function signUp() {
    let arrOfErr = [];
    const loginText1 = '(LOGIN)::Login must be > than 6 and < than 18';
    const loginText2 = `(LOGIN)::Login must do not include this characters 
    [@#$%^&*()/\\=+?|.><,]`;
    const passText1 = '(PASSWORD)::password must be > than 6 and < than 25';
    const passText2 = `(PASSWORD)::password must do not include this characters 
    [@#$%^&*()/\\=+?|.><,]`;
    const passText3 = "(PASSWORD)::passwords ain't equal";
    const emailText1 = `(EMAIL)::email must be > than 6 
    and < than 100 characters`;
    const fullnameText1 = '(NAME)::Fullname must be > than 6 and < than 40';
    const fullnameText2 = `(NAME)::Fullname must do not include this characters 
    [@#$%^&*()/\\=+?|.><,]`;
    // ---------------Login Tests---------------
    //
    if (login.length < 6 || login.length > 18) {
      arrOfErr.push(loginText1);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== loginText1);
    }
    if (login.match(/[@#$%^&*()/\\=+?|.><,]/)) {
      arrOfErr.push(loginText2);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== loginText2);
    }
    // ---------------Password Tests---------------
    //
    if (password.length < 6 || password.length > 25) {
      arrOfErr.push(passText1);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== passText1);
    }
    if (password.match(/[@#$%^&*()/\\=+?|.><,]/)) {
      arrOfErr.push(passText2);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== passText2);
    }
    if (password !== passwordConfirm) {
      arrOfErr.push(passText3);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== passText3);
    }
    // ---------------Email Tests---------------
    //
    if (email.length < 6 || email.length > 100) {
      arrOfErr.push(emailText1);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== emailText1);
    }
    // ---------------Fullname Tests---------------
    //
    if (fullname.length < 6 || fullname.length > 40) {
      arrOfErr.push(fullnameText1);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== fullnameText1);
    }
    if (fullname.match(/[@#$%^&*()/\\=+?|.><,]/)) {
      arrOfErr.push(fullnameText2);
    } else {
      arrOfErr = arrOfErr.filter((elem) => elem !== fullnameText2);
    }

    if (arrOfErr.length === 0) {
      await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          login,
          password,
          passwordConfirm,
          fullname,
          email,
          role: 'user',
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          arrOfErr.push(result.text);
          setSuccess(true)
        });
    }

    setErr(arrOfErr);
  }
  
  if (success) {
    return <h3 style={{color: "greenyellow", fontSize: "25px"}}>You have registered!</h3>
  }


  return (
    <StyledLogin>
      <form action="/auth/login">
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
        <div>
          <label htmlFor="re_password">Repeate password : </label>
          <input
            id="re_password"
            name="re_passwordName"
            onChange={ onChangeField(setpasswordConfirm) }
            type="password"
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            id="email"
            name="emailName"
            onChange={ onChangeField(setEmail) }
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Full name : </label>
          <input
            id="name"
            name="fullName"
            onChange={ onChangeField(setFullname) }
            type="text"
          />
        </div>
        <input
          className="signUp"
          onClick={ signUp }
          type="button"
          value="Sign up"
        />
        <div className="response">{err.text ? `> Error: ${err.text}` : ''}</div>
      </form>
      {err.map((elem, index) => (
        <div className="response" key={ `${index + 1}err` }>
          {elem}
        </div>
      ))}
    </StyledLogin>
  );
};
/*

*/

export default Registration;
