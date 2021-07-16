import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

import './Message.css';

const Message = ({ key, message, inbox, auth }) => {
  const [user, setUser] = useState({})
  let idToRequest;
  const fetchUser = async () => {
    if(inbox){
      idToRequest = message.receiver
    } else {
      idToRequest = message.sender
    }
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${idToRequest}`, {
      headers: {
        'Authorization': `Token ${auth.token}`
      }
    });
    setUser(res.data)
  }
  const deleteMessage = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/post/${key}`);
  }
  useEffect(() => {
    fetchUser()
    return () => {
      
    }
  }, [])
  return (
    <div>
      <img src={user.avatar} height="50px" width="50px" /> <b>{ user.username } </b> -- { message.content } -- Message sent at { message.created_at } {inbox === true ? `from ${ user.username }`: "" }
      <button onClick={deleteMessage}>X</button>
    </div>
  )
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Message);
