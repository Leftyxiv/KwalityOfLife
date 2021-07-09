import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("")
  return (
    <div className='form-bg'>
      <form>
        <label style={{'color': 'black'}}>Username </label>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <br />
        <label style={{'color': 'black'}}>Password </label>
      <input type='password'  value={pass} onChange={(e) => setUsername(e.target.value)}></input>
      <br />
    <input type='submit' />
  </form>
    </div>
  )
}

export default LoginForm;
