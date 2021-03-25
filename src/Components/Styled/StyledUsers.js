import styled from 'styled-components';

const StyledUsers = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 120px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  * {
    margin: 0;
    padding: 0;
  }
`;

const StyledUsersBox = styled.div`
  background-color: rgba(300, 300, 300, 0.4);
  height: 120px;
  border: 1px solid white;

  display: flex;
  align-items: center;
  justify-content: start;

  .profilePic {
    margin: 0 10px 0 10px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .fullname {
    * {
      text-align: center;
    }
  }
`;

export { StyledUsers, StyledUsersBox };
