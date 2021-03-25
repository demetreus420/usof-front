import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledProfile, StyledProfileBtn } from '../Styled/StyledProfile';
import Questions from "./Questions";


const MyProfile = () => {
  const userInfo = useSelector((state) => state.user_info);
  const [userData, setUserData] = useState();
  const [postsData, setPostsData] = useState();
  const address = 'http://localhost:8080/static';
  const [fullName, setFullName] = useState(false)
  const [email, setEmail] = useState(false)
  const [location, setLocation] = useState(false)
  const [about, setAbout] = useState(false);
  const token = useSelector(state => state.token)

  const onFieldChange = (setter) => {
    return (event) => { setter(event.target.value) }
  }
  const [changeFields, setChangeFields] = useState({
    fullname: false,
    email: false,
    location: false,
    about: false
  })

  const changeFieldExist = (field) => {
    return async () => {
      if (changeFields[field]) {
        await fetch(`http://localhost:8080/api/users/${userInfo.id}`, {
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache',
          Authorization: token,
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({ 
            login: userInfo.login , 
            email: email || userInfo.email,
            role: userInfo.role,
            about: about || userInfo.about,
            location: location || userInfo.location,
            fullName : fullName || userInfo.fullname
          }),
        }).then(res => res.json())
        .then(res => {
          // console.log(userData)
          // console.log(res)
          let data = {...userData}
          data[field] = res[field]
          setUserData(data)
        })
        console.log(changeFields)
        let newFields = {...changeFields}
        newFields[field] = !changeFields[field]
        setChangeFields({...newFields})
      } else {
        let newFields = {...changeFields}
        newFields[field] = !changeFields[field]
        setChangeFields({...newFields})
      }
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts`).then(res => res.json())
        .then(res => {
          // let result = res?.filter(elem => elem?.author.toUpperCase().includes(userInfo.login))
          setPostsData(res)
        })
  }, [])

  useEffect(() => {
    setUserData(userInfo);
  }, [userInfo]);

  return (
      <div style={{width: '100%', height: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'column'}}>
    <StyledProfile>
      <div>
        <img
          alt="image"
          src={
            userData?.profilepic
              ? `/${userData.profilepic}`
              : `${address}/userpic.png`
          }
        />
        <ul>
          <li>
            <div>nickname:</div> <div>@{userData?.login}</div>
          </li>
          <li>
          {
            changeFields.fullname ?
              <><div>Fullname:</div><input type="text" onChange={onFieldChange(setFullName)} /></>
              :
              <><div>Fullname:</div> <div>{userData?.fullname}</div></>
          }
          </li>
          <li>
          {
            changeFields.email ?
              <><div>Email:</div><input type="text" onChange={onFieldChange(setEmail)} /></>
              :
              <><div>Email:</div> <div>{userData?.email}</div></>
          }
          </li>
          <li>
          {
            changeFields.location ?
              <><div>Location:</div><input type="text" onChange={onFieldChange(setLocation)} /></>
              :
              <><div>Location:</div> <div>{userData?.location}</div></>
          }
          </li>
          <li>
            <div>rating:</div> <div>{userData?.rating}</div>
          </li>
        </ul>
        <ul className="sub-list">
          <li></li>
          <li><StyledProfileBtn value="Change" onClick={changeFieldExist('fullname')} /></li>
          <li><StyledProfileBtn value="Change" onClick={changeFieldExist('email')} /></li>
          <li><StyledProfileBtn value="Change" onClick={changeFieldExist('location')} /></li>
          <li></li>
        </ul>
      </div>
      <h3>About:</h3>
      <StyledProfileBtn className="about-change-btn" value="Change" onClick={changeFieldExist('about')} />
      <div className="about">
      {
            changeFields.about ?
              <textarea type="textarea" rows="10" cols="100" onChange={onFieldChange(setAbout)} />
              :
              <>{userData?.about ? userData?.about : '---'}</>
      }
      </div>

    </StyledProfile>
    <Questions searchedItems={postsData} />
      </div>
  );
};

export default MyProfile;
