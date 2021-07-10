import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = ({ message }, inbox) => {
  const [user, setUser] = useState({})
  let idToRequest;
  const fetchUser = async () => {
    if(inbox){
      idToRequest = message.receiver
    } else {
      idToRequest = message.sender
    }
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${idToRequest}`);
    setUser(res.data)
  }
  useEffect(() => {
    fetchUser()
    return () => {
      
    }
  }, [])
  return (
    <div>
      <img src={user.avatar} height="50px" width="50px" /> <b>{ user.username } </b> -- { message.content } -- Message sent at { message.created_at }
    </div>
  )
}

export default Message
