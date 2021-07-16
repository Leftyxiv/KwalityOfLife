import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const DirectMessage = (props) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [value, setValue] = useState(-1);
  const [me, setMe] = useState(-1);

  const fetchInfo = async () => {
    const res = await axios.get('http://127.0.0.1:8000/users/all/');
    setUsers(res.data);
  }
  const getMe = () => {
    for(let i = 0; i < users.length; ++i){
      if(users[i]['username'] === props.me.user.username){
        setMe(users[i]['id'])
      }
    }
  }


  useEffect(() => {
    fetchInfo();
    getMe();
    return () => {
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    for(let i = 0; i < users.length; ++i){
      if(users[i]['username'] === recipient){
        setValue(users[i]['id']);
        break;
      }
    }
    if(value < 0){
      toast.error('User not found');
    } else {
      try {
      await axios.post(`http://127.0.0.1:8000/directmessages/${value}/`, {
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
    <div style={{ 'paddingTop': '200px' }}>
      <form onSubmit={onSubmit}>
        <label>Recipient: </label>
        <input type='text' value={recipient} onChange={e => setRecipient(e.target.value)}/>
        <br />
        <label>Message: </label>
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <br />
        <input type='submit' />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { me: state.auth }
}

export default connect(mapStateToProps)(DirectMessage);
