import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { StyledBody, StyledContent, StyledWrapper } from "../Styled/StyledBody";
import Questions from "./Questions";
import Tags from "./Tags";
import { UserProfile, Users } from "./Users";
import SideBar from "./SideBar";
import Login from "./Login";
import Registration from "./Registration";
import MyProfile from "./MyProfile";
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Search from "./Search";

const Body = () => {
  const reduxToken = useSelector((state) => state.token);
  const [token, setToken] = useState(reduxToken);

  useEffect(() => {
    setToken(reduxToken);
  }, [reduxToken]);

  return (
    <StyledBody>
      <StyledWrapper>
        <SideBar />
        <StyledContent>
          <Switch>
            <Route path="/questions/:id">
              <QuestionPage />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/tags">
              <Tags />
            </Route>
            <Route path="/users/:id">
              <UserProfile />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/login">
              {token ? <Redirect to="/questions" /> : <Login />}
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/my_profile">
              {token ? <MyProfile /> : <Redirect to="/questions" />}
            </Route>
            <Route path="/new-question">
              <NewQuestion />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route>
              <Redirect to="/questions" />
            </Route>
          </Switch>
        </StyledContent>
      </StyledWrapper>
    </StyledBody>
  );
};

export default Body;
