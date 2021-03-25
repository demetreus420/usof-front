import React, { useEffect, useState } from 'react';
import { StyledBtn } from '../Styled/StyledBody';
import { useSelector } from 'react-redux';
import {
  StyledLikesAndComments,
  StyledQuestContainer,
  StyledQuestItem,
  StyledTopicData,
} from '../Styled/StyledContent';
import { Link } from 'react-router-dom';

const Questions = ({searchedItems}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [likes, setLikes] = useState([]);
  const token = useSelector((state) => state.token)

  function formateDate(date) {
    return new Date(date).toDateString();
  }
  function calcLikes(likes, item) {
    return likes.reduce((accum, current) => {
      if (current.post_id === item.id && current.selftype) {
        return accum + 1;
      }
      return accum;
    }, 0);
  }
  function formateContent(text, len = 150) {
    let result = text.substr(0, len);
    if (result.length > len) result = result.concat('...');
    return result.replace(/\s+/g, ' ').trim();
  }

  useEffect(() => {
    if (searchedItems === undefined){
      fetch('http://localhost:8080/api/posts')
          .then((res) => res.json())
          .then(
              (result) => {
                setIsLoaded(true);
                setItems(result.rows);
                setLikes(result.likes);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              },
          );
    } else {
      setItems(searchedItems.rows)
      setIsLoaded(true)
      setLikes(searchedItems.likes)
    }
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      {token ? <Link to="/new-question"><StyledBtn style={{margin: '10px', borderColor: 'gold'}} value="Create new question" /></Link> : <></>}
      <StyledQuestContainer>
        {items?.map((item) => (
          <Link to={`/questions/${item.id}`} style={{display:"block", margin:"10px 0"}} key={ item.id }>
            <StyledQuestItem >
              <StyledLikesAndComments>
                👍 {calcLikes(likes, item)}
              </StyledLikesAndComments>
              <StyledTopicData>
                <div>Title: {item.title}</div>
                <div>{formateContent(item.content)}</div>
                <div className="dateAndTags">
                  <div>Tags:( {item.category.join(' | ')} )</div>
                  <div>
                    published ( {formateDate(item.pubdate)} ) by {item.author}
                  </div>
                </div>
              </StyledTopicData>
            </StyledQuestItem>
          </Link>
        ))}
      </StyledQuestContainer>
    </div>
  );
};

export default Questions;
