import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DirectMessage = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [currentValue, setCurrentValue] = useState('---');

  const fetchInfo = async () => {
    const res = await axios.get('http://127.0.0.1:800/users/all/');
    setUsers(res.data);
    console.log(res.data)
  }


  return (
    <div>
      <select value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} >
        <option value="---">---</option>
        {users.map((user) => {
          <option value={user.id}>{user.username}</option>
        })}
      </select>
    </div>
  )
}

export default DirectMessage;
