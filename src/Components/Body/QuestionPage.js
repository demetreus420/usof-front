import React, { useState, useEffect} from 'react'
import styled from 'styled-components';
import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StyledBtn } from '../Styled/StyledBody';

const StyledContainer = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: flex;
`

const StyledQuestionPage = styled.div`
  min-width: 800px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border:  1px dotted rgba(300, 300, 300, 0.4);
  padding: 10px;

  .title,
  .tags,
  .desc {
    padding: 10px;
    background: rgba(300, 300, 300, 0.4);
    min-width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    
  }

  .part {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  div div {
    width: 80%;
    min-height: 40px
  }

  div + div {
    margin-top: 10px;
  }

  div span {
    display: inline-block;
    padding: 10px;
    background: rgba(300, 300, 300, 0.4);
    margin-left: 10px
  }

  .title, h3 {
    text-decoration: underline;
    font-size: 20px;
    /* font-weight: bold; */
  }

  h3 {
    text-align: center;
    margin: 10px auto;
  }

  .comment-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  .comment-elem {
    width: 100%;
    border: 1px solid white;
    padding: 10px;

    display: flex;
    div {
      margin: 0;
      display: flex;
    }
  }
  .likes {
    width: 10%;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    
    ul {
      min-width: 50px;
    }
    li {
      min-width: 50px;
    }
  }
  .comment-main-data {
    flex-direction: column;
    height: 100%;
    width: 100%;
    div {
      width: 100%;
    }
  }
  .author-data {
    align-items: center;
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid white;
    
    .delete-comment {
      display: inline-flex;
      background: white;
      color: red;
      width: 100px;
      justify-content: center;
      align-items: center;
      margin: 0 20px 0 20px;
    }
  }
  .comment-content {
    padding: 10px;
    align-items: center;
    align-items: flex-start;

  }
  
  .post-likes {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    
    div {
      display: flex;
      margin: 0;
      height: 40px;
      justify-content: center;
      align-items: center;
    }
    .post-likes_btn-like {
      color: green;
      border: 1px solid darkgreen;
      box-shadow: 0px 0px 4px green;
    }
    .post-likes_btn-dis {
      color: red;
      border: 1px solid orangered;
      box-shadow: 0px 0px 4px red;
    }
    .post-likes_btn-like,
    .post-likes_btn-dis{
      background: white;
      width: 40%;
    }
    .post-likes_like-count{
      width: 20%;
      background: silver;
      margin: 0 2px;
    }
  }

  .delete-post-block {
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
`
const btnStyle = {
  height: "40px"
}

const PostLikes = ({user, post, token}) => {
  const [postLikes, setPostLikes] = useState([])

  const sendPostLike = (type) => () => {
    console.log(postLikes);
    let checkArr = postLikes.filter(post => post.author === user.login)
    if (checkArr[0]?.selftype === type) {
      fetch(`http://localhost:8080/api/posts/${post.id}/like`, {
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
          author: user.login,
        })
      }).then(() => {
        let newLikes = checkArr[0] ? [...postLikes].filter(i => i.id !== checkArr[0].id) : [...postLikes]
        setPostLikes(newLikes)
      })
    } else {
      fetch(`http://localhost:8080/api/posts/${post.id}/like`, {
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
          selftype: type,
          author: user.login,
        })
      }).then(() => {
        let newLikes = checkArr[0] ? [...postLikes].filter(i => i.id !== checkArr[0].id) : [...postLikes]
        newLikes.push({
          author: user.login,
          selftype: type
        })
        setPostLikes(newLikes)
      })
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${post?.id}/like`).then(res => res.json())
        .then(res => {
          if (res[0]) {
            setPostLikes(res)
          } else {
            setPostLikes([])
          }
        })
  }, [])
  return(
      <div className="post-likes">
        {user ? <div className="post-likes_btn-like" onClick={sendPostLike(true)}>Like</div> : <div></div>}
        <div className="post-likes_like-count">{postLikes ? postLikes.reduce((accumulator, currentValue) => {
          return currentValue.selftype ? accumulator + 1 : accumulator - 1;
        }, 0) : "0"}</div>
        {user ? <div className="post-likes_btn-dis" onClick={sendPostLike(false)}>Dislike</div> : <div></div>}
      </div>
  )
}

const PostComment = ({elem, user, token}) => {
  const [likes, setLikes] = useState([]);

  const deleteComment = () => {
    fetch(`http://localhost:8080/api/comments/${elem.id}`, {
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
        author: user.login,
      })
    }).then(() => {
      window.location.reload()
    })
  }

  const sendLike = (type) => () => {
    let checkArr = likes.filter(elem => elem.author === user.login)
    if (checkArr[0]?.selftype === type) {
      fetch(`http://localhost:8080/api/comments/${elem.id}/like`, {
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
          author: user.login,
        })
      }).then(() => {
        let newLikes = [...likes].filter(i => i.id !== checkArr[0].id)
        setLikes(newLikes)
      })
    } else {
      fetch(`http://localhost:8080/api/comments/${elem.id}/like`, {
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
          selftype: type,
          author: user.login,
        })
      }).then(() => {
        let newLikes = checkArr[0] ? [...likes].filter(i => i.id !== checkArr[0].id) : [...likes]
        newLikes.push({
          author: user.login,
          selftype: type
        })
        setLikes(newLikes)
      })
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/comments/${elem?.id}/like`).then(res => res.json())
      .then(res => {
        if (!res[0]) {
          setLikes([])
        } else {
          setLikes(res)
        }
      })
  }, [])

  if (likes) {
    return (
      <div className="comment-elem">
        <div className="likes">
          <ul>
            {user ? <li style={{background: "white", color: "green", textAlign: "center", padding: "5px"}}
                 onClick={sendLike(true)}>Like</li>
              : <></>
            }
            <li style={{background: "silver", color: "white", textAlign: "center", padding: "5px"}}>{likes[0] ? likes.filter(elem => elem.selftype).length - likes.filter(elem => !elem.selftype).length : 0}</li>
            {user ?
                <li style={{background: "white", color: "red", textAlign: "center", padding: "5px"}} onClick={sendLike(false)}>Dislike</li>
                : <></>}
          </ul>
        </div>
        <div className="comment-main-data">
          <div className="author-data">
            {elem.author === user?.login ? <div className="delete-comment" onClick={deleteComment}>DELETE</div> : <></>}
            published at {new Date(elem?.pubdate).toLocaleDateString()} by {elem?.author}
          </div>
          <div className="comment-content">{elem?.content}</div>
        </div>
      </div>
    )
  }

  if (!elem) {
    return(<></>)
  }
  return (<div>Loading...</div>)
}


const QuestionPage = () => {
  const { id } = useParams()
  const [data, setData] = useState()
  const userInfo = useSelector(state => state.user_info)
  const token = useSelector(state => state.token)
  const [postComments, setPostComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [fields, setFields] = useState({
    titleField: '',
    tagsField: '',
    descField: '',
  })
  const [status, setStatus] = useState({
    commentStatus: false,
    tagsStatus: false,
    titleStatus: false,
    descStatus: false,
  })

  const changeComment = (event) => setNewComment(event.target.value);

  const deletePost = () => {
    fetch(`http://localhost:8080/api/posts/${id}`,{
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
        author: userInfo?.login,
      })
    }).then(() => {
      window.location = 'http://localhost:3000/'
    })
  }

  const sendNewValues = () => {
    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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
        title: fields.titleField || data.title,
        content: fields.descField || data.content,
        category: fields.tagsField.trim().split(',') || data.category,
      })
    })
    fields.tagsField.trim().split(',').forEach(elem => {
      fetch(`http://localhost:8080/api/categories`, {
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
          title: elem,
          description: '--',
        })
      })
    })
  }

  const sendNewComment = () => {
    fetch(`http://localhost:8080/api/posts/${id}/comments`, {
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
        author: userInfo.login,
        content: newComment,
      })
    }).then(() => {
      window.location.reload()
    })

  }

  const setFieldName = (name) => {
    if (name === 'title') return (event) => setFields({...fields, titleField: event.target.value})
    if (name === 'tags') return (event) => setFields({...fields, tagsField: event.target.value})
    if (name === 'desc') return (event) => setFields({...fields, descField: event.target.value})
    
    return () => {}
  }

  const setFieldStatus = (name) => {
    // console.log(status)
    let emptyFields = [];
    for (let key in fields) {
      emptyFields.push(fields[key])
    }
    console.log(emptyFields)
    console.log(!emptyFields.includes(''))
    if (!emptyFields.includes('')) {
      if (name === 'title-status') return () => {setStatus({...status, titleStatus: !status.titleStatus}) || sendNewValues()}
      if (name === 'tags-status') return () => {setStatus({...status, tagsStatus: !status.tagsStatus}) || sendNewValues()}
      if (name === 'desc-status') return () => {setStatus({...status, descStatus: !status.descStatus}) || sendNewValues()}
      if (name === 'comment-status') return () => {setStatus({...status, commentStatus: !status.commentStatus})}
    }
    return () => {}
  }

  useEffect(() => {
    // console.log(userInfo)

    fetch(`http://localhost:8080/api/posts/${id}`).then(res => res.json())
      .then(res => {
        setFields({
          titleField: res.title,
          tagsField: res.category.join(),
          descField: res.content,
        })
        setData(res)
      })
    fetch(`http://localhost:8080/api/posts/${id}/comments`).then(res => res.json())
      .then(res => {
        setPostComments(res)
      })
  }, [])

  if (data) {
    return (
      <StyledContainer>
        <StyledQuestionPage>
          {data.author_id === userInfo?.id ? <div className="delete-post-block"><StyledBtn value={"DELETE"} onClick={deletePost} /></div> : <></>}
          <div className="title">
            <div className="part">Title: {fields.titleField? fields.titleField : data.title}</div>
            {data.author_id === userInfo?.id && status?.titleStatus ? <input maxLength="30" onChange={setFieldName('title')} /> : <></>}
            {data.author_id === userInfo?.id ? <StyledBtn style={btnStyle} value="Change" onClick={setFieldStatus('title-status')} /> : <></>}
          </div>
          <div className="tags">
            <div className="part">Tags: {fields.tagsField ?
                                          fields?.tagsField?.split(',').map(elem => elem.trim()).filter(elem => elem !== '').map((elem,id) => <span key={`span${id}`}>{elem}</span>)
                                          : data.category.map((elem,id) => <span key={`span${id}`}>{elem}</span>)}</div>
            {data.author_id === userInfo?.id && status?.tagsStatus ? <input maxLength="40" onChange={setFieldName('tags')} /> : <></>}
            {data.author_id === userInfo?.id ? <StyledBtn style={btnStyle} value="Change" onClick={setFieldStatus('tags-status')} /> : <></>}
          </div>
          <div className="desc">
            <div>Description: {fields.descField ? fields.descField : data.content}</div>
            {data.author_id === userInfo?.id ? <StyledBtn style={btnStyle} value="Change" onClick={setFieldStatus('desc-status')} /> : <></>}
          </div>
          <div>
          {data.author_id === userInfo?.id
            &&
          status?.descStatus
            ? <textarea defaultValue={fields.descField || data.content} cols="90" rows="30" maxLength="3600" onChange={setFieldName('desc')} />
            : <></>}
          </div>
          {userInfo?.id && !status.commentStatus ? <StyledBtn style={{width: "100%", margin: "0"}} value="New Comment" onClick={setFieldStatus('comment-status')} /> : <></> }
          <PostLikes user={userInfo} post={data} token={token}/>
          <div className="comment-block">
            <h3>Comments</h3>
            {status.commentStatus ? 
              <>
                <textarea cols="90" rows="10" maxLength="3600" onChange={changeComment}/>
                <StyledBtn style={{width: "100%", margin: "10px 0"}} value="Send" onClick={sendNewComment} />
              </>
             : <></>}
            {postComments ? postComments?.map((elem, elemId) => <PostComment user={userInfo} token={token} elem={elem} key={`commentId-${elemId}`}/>) : <></>}
          </div>
        </StyledQuestionPage>
      </StyledContainer>
    )
  }

  return <h3>Loading...</h3>
}

export default QuestionPage