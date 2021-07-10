import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [user, setUser] = useState("");
  const [inbox, setInbox] = useState([]);

  const fetchUser = async () => {
    const token = `Token ${localStorage.getItem('token')}`
    const res = await axios.get('http://127.0.0.1:8000/api/users/me', {
      headers: {
        'Authorization': token,
      }
    });
    setUser(res.data.username);
    const messages = await axios.get(`http://127.0.0.1:8000/messages/${username}`)
  }
  useEffect(() => {
    fetchUser()
    return () => {
      
    }
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default Inbox
