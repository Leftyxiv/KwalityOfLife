import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = (props) => {
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${props.user}`)
    setUser(res.data)
  }
  const deleteComment = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/post/${props.id}`);
  }
  useEffect(() => {
    fetchUser()
    return () => {
      
    }
  }, [])
  return (
    <div>
      <img src={user.avatar} height="50px" width="50px" /> <b>{ user.username } </b> -- { props.body }
      <button onClick={deleteComment}>X</button>
    </div>
  )
}

export default Comment;
