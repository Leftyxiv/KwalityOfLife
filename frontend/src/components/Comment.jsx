import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = (props) => {
  const [user, setUser] = useState({})
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  console.log(props)

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${props.user}`)
    setUser(res.data)
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
      <b>{ user.username }</b>
      <br />
      { props.body }
      <br />
      <button>Likes { props.likes }</button> <a href={ `http://127.0.0.1:8000/comment/${props.id}/adddislike` } ><button>Dislikes { props.dislikes }</button></a>
      </div>
    </div>
  )
}

export default Comment;
