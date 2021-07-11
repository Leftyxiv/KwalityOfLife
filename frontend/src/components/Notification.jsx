import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Notification = ({ user, text }) => {
  const [thisUser, setUser] = useState({})

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${user}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    setUser(res.data);
  }
  useEffect(() => {
    fetchUser()
    return () => {
    }
  }, [])
  return (
    <div>
      <img src={thisUser.avatar} height="50px" width="50px" /> <b>{ thisUser.username } </b> -- { text } 
    </div>
  )
}

export default Notification;
