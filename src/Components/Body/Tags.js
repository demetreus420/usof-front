import React, { useEffect, useState } from 'react';
import { StyledTags, StyledTagBox } from '../Styled/StyledTags';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Tags = ({searchedItems}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const userInfo = useSelector(state => state.user_info)
  const token = useSelector(state => state.token)

  function formateContent(text, len) {
    let result = text.substr(0, len);
    if (result.length > len) result = result.concat('...');
    return result.replace(/\s+/g, ' ').trim();
  }

  useEffect(() => {
    if (searchedItems === undefined){
      fetch('http://localhost:8080/api/categories')
          .then((res) => res.json())
          .then(
              (result) => {
                setIsLoaded(true);
                setItems(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              },
          );
    } else {
      setIsLoaded(true);
      setItems(searchedItems)
    }
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const deleteTag = (id) => () => {
    fetch(`http://localhost:8080/api/categories/${id}`,{
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        user_role: userInfo?.role
      }),
    })
    window.location.reload()
  }

  return (
    <StyledTags>
      {items.map((item) => (
          <Link to={`/search?type=questions&body=${item?.title}&by=tags`} >
            <StyledTagBox key={ `tagKey${item.id}` }>
              <div className="title">
                <div>{formateContent(item.title, 50)}</div>
                  {userInfo?.role === 'admin' ? <div className="delete-btn" onClick={deleteTag(item.id)}>Delete</div> : <></> }
              </div>
              <div className="desc">{formateContent(item.descript, 150)}</div>
            </StyledTagBox>
          </Link>
      ))}
    </StyledTags>
  );
};
export default Tags;
