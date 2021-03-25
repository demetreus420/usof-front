import styled from 'styled-components';

const colorBlue = 'rgb(0, 50, 70)';
const StyledProfileBtn = styled.input.attrs((props) => ({
  type: 'button',
  value: props.value,
}))`
  color: ${colorBlue};
  height: 30px;
  border: 2px solid silver;
  transition: all 0.5s ease-out;
  background-color: white;
  text-align: center;
`;

const StyledProfile = styled.div`
  padding: 10px;
  min-width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  h3 {
    margin: 50px 0 50px 0;
    text-align: center;
    width: 100%;
    text-decoration: underline;
    font-size: 20px;
  }

  .about-change-btn {
    margin: 0 0 30px 10px;
    width: 100px;
  }
  .about {
    width: 100%;
    padding: 0 50px 0 50px;

  }

  img {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }

  ul {
    width: 600px;
    border-left: 1px solid white;
    border-right: 1px solid white;
  }

  .sub-list {
    width: 100px;
    border-left: none;
    border-right: none;
  }

  ul li {
    padding: 0 10px 0 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li + li {
    border-top: 1px solid white;
  }
`;

export { StyledProfileBtn, StyledProfile };
