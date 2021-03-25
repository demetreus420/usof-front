import styled from 'styled-components';

const colorBlue = 'rgb(0, 50, 70)';

const StyledBody = styled.div`
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  background-color: ${colorBlue};
  color: white;

  img {
    width: 100px;
    height: 100px;
  }
`;

const StyledInput = styled.input.attrs((props) => ({
  type: 'text',
  value: props.value,
}))`
  height: ${40 - 4}px;
  width: 700px;
  border: 2px solid palevioletred;
  background-color: white;
`;

const StyledBtn = styled.input.attrs((props) => ({
  type: 'button',
  value: props.value,
}))`
  height: 40px;
  border: 2px solid palevioletred;
  margin: 0 0 0 10px;
  padding: 10px;

  background-color: white;
`;

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 1260px;
  height: 100%;
  background-color: transparent;
  /* border: 2px solid white; */
  color: white;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledSideBar = styled.div`
  width: 300px;
  /* border: 2px dashed white; */
  min-height: 100vh;
`;

const StyledContent = styled.div`
  width: 960px;
  border-left: 2px solid white;
  min-height: 100vh;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledSideBarMenu = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;

  * {
    color: white;
  }

  * + * {
    margin-top: 10px;
  }
`;

const StyledSideBarMenuItem = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(300, 300, 300, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s ease-out;

  &:hover,
  &:focus,
  &:active {
    background-color: #fff;
    * {
      transition: all 0.5s ease-out;
      color: ${colorBlue};
    }
  }

  * {
    margin-left: 10px;
    display: block;
  }
`;

export {
  StyledBody,
  StyledWrapper,
  StyledInput,
  StyledBtn,
  StyledSideBar,
  StyledContent,
  StyledSideBarMenu,
  StyledSideBarMenuItem,
};
