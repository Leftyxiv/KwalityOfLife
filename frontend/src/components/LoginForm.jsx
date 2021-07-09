import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("")

  const login = 'http://127.0.0.1:8000/api/token/login/'

  const onSub = async (e) => {
    e.preventDefault()
    const res = await axios.post(login, {
      username,
      password: pass
    })
    // console.log(res.data['auth_token'])
    const cookies = new Cookies()
    cookies.set('Bearer', res.data['auth_token'])
    console.log(cookies.get('Bearer'))
  }
  return (
    <div className='form-bg'>
      <form onSubmit={onSub}>
        <label style={{'color': 'black'}}>Username </label>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <br />
        <label style={{'color': 'black'}}>Password </label>
      <input type='password'  value={pass} onChange={(e) => setPass(e.target.value)}></input>
      <br />
    <input type='submit' />
  </form>
    </div>
  )
}

export default LoginForm;
