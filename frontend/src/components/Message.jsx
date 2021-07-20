import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

import './Message.css';

const Message = ({ message, inbox, auth }) => {
  const [sender, setSender] = useState({})
  const [receiver, setReceiver] = useState({})
  const fetchUser = async () => {
    // if(inbox){
    //   idToRequest = message.receiver
    // } else {
    //   idToRequest = message.sender
    // }
    const send = await axios.get(`http://127.0.0.1:8000/api/customuser/${message.sender}`, {
      headers: {
        'Authorization': `Token ${auth.token}`
      }
    });
    setSender(send.data)
    const rec = await axios.get(`http://127.0.0.1:8000/api/customuser/${message.receiver}`, {
      headers: {
        'Authorization': `Token ${auth.token}`
      }
    });
    setReceiver(rec.data)
  }
  const deleteMessage = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/directmessages/${message.id}`);
  }
  useEffect(() => {
    fetchUser()
    return () => {
      
    }
  }, [])
  return (
    <div>
      <img src={sender.avatar} height="50px" width="50px" /> <b>{ sender.username } </b> -- { message.content } -- Message sent at { message.created_at } {inbox === true ? `from ${ sender.username }`: "" }
      <button className='btn-danger' onClick={deleteMessage}>X</button>
    </div>
  )
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Message);
