import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledUsers, StyledUsersBox } from "../Styled/StyledUsers";
import { StyledProfile } from "../Styled/StyledProfile";

const address = "http://localhost:8080/static";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUserProfile(result);
        },
        (error) => {
          setIsLoaded(true);
          setErr(error);
        }
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (err) {
    return <div>{err}</div>;
  }

  if (userProfile) {
    return (
      <StyledProfile>
        <div>
          <img
            alt="image"
            src={
              userProfile?.profilepic
                ? `/${userProfile.profilepic}`
                : "http://localhost:8080/static/userpic.png"
            }
          />
          <ul>
            <li>
              <div>nickname:</div> <div>@{userProfile?.login}</div>
            </li>
            <li>
              <div>Fullname:</div> <div>{userProfile?.fullname}</div>
            </li>
            <li>
              <div>email:</div> <div>{userProfile?.email}</div>
            </li>
            <li>
              <div>location:</div>{" "}
              <div>{userProfile?.location ? userProfile?.location : "--"}</div>
            </li>
            <li>
              <div>rating:</div> <div>{userProfile?.rating}</div>
            </li>
          </ul>
        </div>
        <h3>About:</h3>
        <div className="about">
          {userProfile?.about ? userProfile?.about : "--"}
        </div>
      </StyledProfile>
    );
  }

  return <div>Loading...</div>;
};

const Users = ({searchedItems}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!searchedItems){
      fetch("http://localhost:8080/api/users")
          .then((res) => res.json())
          .then(
              (result) => {
                setIsLoaded(true);
                setItems(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
          );
    } else {
      setIsLoaded(true);
      setItems(searchedItems);
    }
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <StyledUsers>
      {items?.map((item) => (
        <Link key={item.id} to={`/users/${item.id}`}>
          <StyledUsersBox>
            <div className="profilePic">
              <img
                alt="pic"
                src={
                  item.profilepic
                    ? `${address}/${item.profilepic}`
                    : "http://localhost:8080/static/userpic.png"
                }
              />
            </div>
            <div className="fullname">
              <ul>
                <li>{item.fullname}</li>
                <li>
                  (@{item.login}:{item.role})
                </li>
              </ul>
            </div>
            {/* </Link> */}
          </StyledUsersBox>
        </Link>
      ))}
    </StyledUsers>
  );
};

export { Users, UserProfile };
