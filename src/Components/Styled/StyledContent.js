import styled from 'styled-components';

const StyledQuestContainer = styled.div`
  min-width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const StyledQuestItem = styled.div`
  background-color: #fff7;
  min-width: 100%;
  min-height: 100px;
  height: 100%;
  //max-height: auto;
  display: grid;
  grid-template-columns: 150px auto;

  * {
    border: 1px solid white;
  }

  & + & {
    margin-top: 10px;
  }
`;

const StyledLikesAndComments = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const StyledTopicData = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  border: none;
  * {
    word-break: break-word;
    padding: 10px;
    width: 100%;
    height: 100%;
  }

  .dateAndTags {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    margin: 0px;
    * {
      border: none;
      text-align: right;
    }

    *:first-child {
      text-align: left;
    }
  }
`;

export {
  StyledQuestItem,
  StyledQuestContainer,
  StyledTopicData,
  StyledLikesAndComments,
};
