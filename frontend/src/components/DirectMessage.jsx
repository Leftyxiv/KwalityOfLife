import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DirectMessage = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [value, setValue] = useState(-1);

  const fetchInfo = async () => {
    const res = await axios.get('http://127.0.0.1:8000/users/all/');
    setUsers(res.data);
  }


  useEffect(() => {
    fetchInfo()
    return () => {
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    for(let user of users){
      if(user.username === recipient){
        setValue(user.id);
        break;
      }
    }
    if(value < 0){
      toast.error('User not found');
    } else {
      await axios.post(`http://127.0.0.1:8000/messages/dm/`)
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

export default DirectMessage;
