import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Message from './Message';
import './Inbox.css'

const Inbox = () => {
  const [user, setUser] = useState("");
  const [inbox, setInbox] = useState([]);

  const fetchMessages = async () => {
    const thisuser = localStorage.getItem('user');
    const regex = /{"username":"(\w+)"}/
    setUser(thisuser.match(regex)[1])
    console.log(user)
    // setUser(thisuser['username']);
    const messages = await axios.get(`http://127.0.0.1:8000/messages/${user}`)
    setInbox(messages.data)
  }

  // const fetchUser = async () => {
  //   const token = `Token ${localStorage.getItem('token')}`
  //   const res = await axios.get('http://127.0.0.1:8000/api/users/me', {
  //     headers: {
  //       'Authorization': token,
  //     }
  //   });
  //   setUser(res.data['username']);
  // }
  useEffect(() => {
    // fetchUser()
    fetchMessages(user)
    return () => {
      
    }
  }, [])
  return (
    <div className="inboxWrapper">
      {inbox.map(message => <Message key={message.id} message={message} inbox={true} /> ) }
    </div>
  )
}

export default Inbox
