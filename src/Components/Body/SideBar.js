import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  StyledSideBar,
  StyledSideBarMenu,
  StyledSideBarMenuItem,
} from '../Styled/StyledBody';

const SideBar = () => (
  <StyledSideBar>
    <StyledSideBarMenu>
      <NavLink to="/questions">
        <StyledSideBarMenuItem>
          <span>Questions</span>
        </StyledSideBarMenuItem>
      </NavLink>
      <NavLink to="/tags">
        <StyledSideBarMenuItem>
          <span>Tags</span>
        </StyledSideBarMenuItem>
      </NavLink>
      <NavLink to="/users">
        <StyledSideBarMenuItem>
          <span>Users</span>
        </StyledSideBarMenuItem>
      </NavLink>
    </StyledSideBarMenu>
  </StyledSideBar>
);

export default SideBar;
