import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../logo.svg';
import {
  StyledHeader,
  StyledWrapper,
  StyledInput,
  StyledBtn,
  StyledProfileHead,
  StyledSubmit,
} from '../Styled/StyledHeader';

const address = 'http://localhost:8080/static';
const SubHeaderNotAuth = () => (
  <div>
    <Link to="/login">
      <StyledBtn value="Login" />
    </Link>
    <Link to="/registration">
      <StyledBtn value="Sign up!" />
    </Link>
  </div>
);

const SubHeaderIsAuth = ({ user, callback }) => (
  <div>
    <div>
      <StyledProfileHead>
        <Link to="/my_profile">
          <img
            alt="image"
            src={
              user.profilepic
                ? `${address}/${user.profilepic}`
                : 'http://localhost:8080/static/userpic.png'
            }
          />
        </Link>
        <div>@{user.login}:{user.role}:{user.rating}</div>
        <StyledBtn onClick={ callback } value="Log out" />
      </StyledProfileHead>
    </div>
  </div>
);

const Header = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user_id);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [searchOption, setSearchOption] = useState('tags')
  const [searchField, setSearchField] = useState('')
  const clearInfo = () => {
    // clear Cookies
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    // clear Redux fields
    setUser(null);

    setTimeout(() => {
        window.location.reload()
    }, 500);
  };

  useEffect(() => {
    if (token !== undefined) {
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          setUser(() => result);
          dispatch({ type: 'UPDATE_USER_INFO', payload: result });
        });
    }
  }, [token]);

  useEffect(() => {
    if (user === null) {
      dispatch({ type: 'UPDATE_TOKEN', payload: undefined });
      dispatch({ type: 'UPDATE_USER_ID', payload: undefined });
    }
  }, [user])

  const SelectOnChange = (event) => {
    setSearchOption(event.target.value)
  }
  const SearchFieldOnChange = (event) => {
    setSearchField(event.target.value)
  }

  const formSubmit = (so, sf) => (event) => {
    let myLocation = `http//localhost:3000/search?type=${so}&body=${sf}`
    console.log(myLocation)
    window.location = myLocation
  }

  return (
    <StyledHeader>
      <StyledWrapper>
        <Link to="/">
          <img alt="" srcSet={ logo } />
          <span className="logo-text">USOF_FRONT</span>
        </Link>
        <form onSubmit={formSubmit(searchOption, searchField)}>
          <select onChange={SelectOnChange}>
            <option defaultValue value="tags">
              Tags
            </option>
            <option value="questions">
              Questions
            </option>
            <option value="users">
              Users
            </option>
          </select>
          <StyledInput placeholder="Search..." onChange={SearchFieldOnChange}/>
          <Link to={`/search?type=${searchOption}&body=${searchField}`} ><StyledSubmit value="Search" /></Link>
        </form>
        {token === undefined || !user ? (
          <SubHeaderNotAuth />
        ) : (
          <SubHeaderIsAuth callback={ clearInfo } user={ user } />
        )}
      </StyledWrapper>
    </StyledHeader>
  );
};

export default Header;
