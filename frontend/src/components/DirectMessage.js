import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import './DirectMessage.css';

const DirectMessage = (props) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [value, setValue] = useState(-1);
  const [me, setMe] = useState(-1);

  const fetchInfo = async () => {
    const res = await axios.get('http://127.0.0.1:8000/users/all');
    setUsers(res.data);
    // console.log(res.data)
  }
  const getMe = () => {
    for(let i = 0; i < users.length; ++i){
      if(users[i]['username'] === props.me.user.username){
        // console.log(users[i])
        setMe(users[i]['id'])
        // console.log(me)
      }
    }
  }


  useEffect(() => {
    fetchInfo();
    getMe();
    return () => {
    }
  }, [recipient])

  const onSubmit = async (e) => {
    e.preventDefault();
    for(let i = 0; i < users.length; ++i){
      if(users[i]['username'] === recipient){
        setValue(users[i]['id']);
        break;
      }
    }
    if(value < 0){
      // toast.error('User not found');
    } else {
      try {
      await axios.post(`http://127.0.0.1:8000/messages/dm/${value}/`, {
        sender: me,
        receiver: value,
        content: text
      }, {
        headers: {
          'Authorization': `Token ${props.me.token}`
        }
      });
    } catch (err) {
      console.log(err)
    }
      toast.success('Message sent!');
      setRecipient('');
      setText('');
    }
  }


  return (
    <div id='message-form' style={{'display': 'flex', 'justifyContent': 'center' }}>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <h2 style={{'color': 'white'}}>Send a message!</h2>
        {/* <label>Recipient: </label> */}
        <input type='text' className='form-control' placeholder='Recipient' value={recipient} onChange={e => setRecipient(e.target.value)}/>
        <br />
        {/* <label>Message: </label> */}
        <textarea className='form-control' placeholder='Message....' value={text} onChange={e => setText(e.target.value)} />
        <br />
        <input type='submit' className='btn btn-dark btn-lg'/>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { me: state.auth }
}

export default connect(mapStateToProps)(DirectMessage);
