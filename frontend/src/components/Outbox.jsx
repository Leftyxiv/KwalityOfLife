import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Message from './Message';
import './Inbox.css'

const Outbox = (props) => {
  const [user, setUser] = useState("");
  const [outbox, setOutbox] = useState([]);

  const fetchMessages = async () => {
    const thisuser = localStorage.getItem('user');
    const regex = /{"username":"(\w+)"}/
    setUser(thisuser.match(regex)[1])
    const messages = await axios.get(`http://127.0.0.1:8000/messagessent/${props.name}`)
    setOutbox(messages.data.reverse())
  }

  useEffect(() => {
    // fetchUser()

    if(!user){
      const thisuser = localStorage.getItem('user');
      const regex = /{"username":"(\w+)"}/
      setUser(thisuser.match(regex)[1])
    }
    fetchMessages()
    return () => {
      
    }
  }, [])
  return (
    <div className="inboxWrapper">
      {outbox.map(message => <Message key={message.id} message={message} inbox={false} /> ) }
    </div>
  )
}

export default Outbox;
