import React, { useState } from 'react'
import { StyledBtn } from '../Styled/StyledBody';
import  styled  from 'styled-components'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const StyledForm = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 10px 0 30px 0;
  border-left: 1px solid silver;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;

  label {
    border-bottom: 1px solid silver;
    border-right: 1px solid silver;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    div span {
      color: silver;
    }
  }
`

const NewQuestion = () => {
  const [title, setTitle] = useState('shit');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [errors, setErrors] = useState([])
  const [isSended, setIsSended] = useState(false)
  const token = useSelector(state => state.token)
  const userInfo = useSelector(state => state.user_info)

  const onChangeFunc = (setter) => (event) => setter(event.target.value);
  const sendQuestion = () => {
    if (errors.length === 0) {     
    fetch(`http://localhost:8080/api/posts/`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
          title,
          content: desc,
          category: tags.trim().split(','),
          author: userInfo.login,
          id: userInfo.id
        })
      }).then(() => {
        setIsSended(true)
      })
    }
  }

  useEffect(() => {
    let arr = [];
    if (title.length < 6) {
      arr = ([...arr, "Title must be longer than 6 symbols"])
    }
    if (tags.length === 0) {
      arr = ([...arr, "Question must have at least 1 tag"])
    }
    if (desc.length < 10) {
      arr = ([...arr, "Description must be longer than 10 symbols"])
    }

    setErrors(arr)
  }, [title, desc, tags])

  if (isSended) {
    return <Redirect to="/questions" />
  }

  return (
    <div style={{width: "100%"}}>
      <StyledForm action="/new-question" method="post">
        <label htmlFor="title">
          <div>Title:</div> <input type="text" name="title" id="title" value={title} onChange={onChangeFunc(setTitle)}/>
        </label>
        <label htmlFor="tags">
          <div>Tags: <span>like tag1,tag2,tag3</span></div> <input type="text" name="tags" id="tags" value={tags} onChange={onChangeFunc(setTags)}/>
        </label>
        <label htmlFor="desc">
          <div>Description:</div>
          <textarea name="desc" id="desc" cols="50" rows="40" value={desc} onChange={onChangeFunc(setDesc)}/>
        </label>
        <StyledBtn value="Send" onClick={sendQuestion} />
      </StyledForm>
      <ul style={{margin: "10px auto", width:"500px"}}>
        {errors ? errors.map((err, id) => <li style={{color:"red", textDecoration:"underline"}} key={`someKey${id}`}>{`>${err}`}</li>) : <></>}
      </ul>
    </div>
  )
}

export default NewQuestion