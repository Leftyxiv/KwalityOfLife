import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = (props) => {
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${props.user}`)
    setUser(res.data)
  }
  return (
    <div>
      <img src={user.} { props.user } -- { props.body }
    </div>
  )
}

export default Comment;
