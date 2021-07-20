import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Notification = ({ key, user, text }) => {
  const [thisUser, setUser] = useState({})

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${user}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    setUser(res.data);
  }
  const deleteNotification = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/post/${key}`);
  }
  useEffect(() => {
    fetchUser()
    return () => {
    }
  }, [])
  return (
    <div>
      <img src={thisUser.avatar} height="50px" width="50px" /> <b>{ thisUser.username } </b> -- { text } 
      <button className='btn-danger' onClick={deleteNotification}>X</button>
    </div>
  )
}

export default Notification;
