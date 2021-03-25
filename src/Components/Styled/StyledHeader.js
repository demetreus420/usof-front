import styled from 'styled-components';

const colorBlue = 'rgb(0, 50, 70)';

const StyledHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100px;
  background-color: orange;
  color: ${colorBlue};

  img {
    width: 100px;
    height: 100px;
  }

  *:hover {
    border-color: white;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    -ms-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
  }
`;

const StyledInput = styled.input.attrs((props) => ({
  type: 'text',
  value: props.value,
}))`
  color: ${colorBlue};
  height: ${40 - 4}px;
  width: 700px;
  border: 2px solid gold;
  padding: 0 10px 0 10px;
  background-color: white;
  transition: all 0.5s ease-out;
`;

const StyledBtn = styled.input.attrs((props) => ({
  type: 'button',
  value: props.value,
}))`
  color: ${colorBlue};
  height: 40px;
  border: 2px solid gold;
  margin: 0 0 0 10px;
  padding: 10px;
  transition: all 0.5s ease-out;
  background-color: white;
`;

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 1260px;
  height: 100px;
  background-color: transparent;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .logo-text {
    position: absolute;
    top: 30px;
    left: 100px;
    font-weight: bolder;
    font-size: 40px;
    color: aqua;
    text-shadow: 7px 6px 1px rgb(120,12,12, 0.5),
      white -1px 1px 1px, white 1px -1px 1px;
  }
`;

const StyledProfileHead = styled.div`
  height: 60px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    width: 40px;
    height: 40px;
  }

  
`;

const StyledSubmit = styled.input.attrs((props) => ({
  type: 'submit',
  value: props.value,
}))`
  color: ${colorBlue};
  height: 40px;
  border: 2px solid gold;
  margin: 0 0 0 10px;
  padding: 10px;
  transition: all 0.5s ease-out;
  background-color: white;
`;

export {
  StyledHeader,
  StyledWrapper,
  StyledInput,
  StyledBtn,
  StyledProfileHead,
  StyledSubmit,
};
