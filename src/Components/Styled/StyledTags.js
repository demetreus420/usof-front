import styled from 'styled-components';

const StyledTags = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200px;
  grid-gap: 20px;
  
  a {
    display: block;
  }
`;

const StyledTagBox = styled.div`
  background-color: rgba(300, 300, 300, 0.4);
  height: 200px;
  border: 1px solid white;

  .title {
    width: 100%;
    height: 50px;
    padding: 5%;
    display: flex;
    border-bottom: 1px solid white;
    align-items: center;
    justify-content: center;
  }

  .desc {
    padding: 10px;
  }

  .delete-btn {
    background: white;
    color: red;
    text-decoration: underline;
    border: 1px solid darkred;
    box-shadow: 0px 0px 3px red;
    text-align: center;
    padding: 5px;
    margin-left: 10px;
    &:hover {
      box-shadow: 0px 0px 5px white;
    }
    transition: .5s;
  }
`;

export { StyledTags, StyledTagBox };
