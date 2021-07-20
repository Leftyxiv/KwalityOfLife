import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Comment = (props) => {
  const [user, setUser] = useState({})
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${props.user}`)
    setUser(res.data)
  }
  const deleteComment = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/comment/${props.id}`);
  }
  const addLike = async () => {
  const url = `http://127.0.0.1:8000/comment/${props.id}/addlike/`
  await axios.get(url)
  setLikes(likes + 1)
  }

  const addDislike = async () => {
    const url = `http://127.0.0.1:8000/comment/${props.id}/adddislike/`
    await axios.get(url)
    setDislikes(dislikes + 1)
  }

  useEffect(() => {
    fetchUser()
    setLikes(props.likes)
    setDislikes(props.dislikes)
    return () => {
      
    }
  }, [])
  return (
    <div style={{'display': 'flex'}}>
      <div>
      <img alt="user avatar" src={user.avatar} height="50px" width="50px" /> 
      </div>
      <div>
      <Link to={`/user/${user.id}`}><b>{ user.username }</b></Link>
      <br />
      { props.body }
      <br />
      <button className='btn-success' onClick={addLike}>Likes { likes }</button> <button className='btn-warning' onClick={addDislike}>Dislikes { dislikes }</button>
      </div>
      <button className='btn-danger' onClick={deleteComment}>X</button>
    </div>
  )
}

export default Comment;
