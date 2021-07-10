import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'universal-cookie';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from './LoginActions';

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("")

  const url = 'http://127.0.0.1:8000/api/token/login/'

  const onSub = async (e) => {
    e.preventDefault()
    const user = {
    username,
    password: pass
    }
    const res = await axios.post(url, user)
    props.login(user)
    console.log(res.data['auth_token'])
    // const cookies = new Cookies()
    // cookies.set('Bearer', res.data['auth_token'])
    // console.log(cookies.get('Bearer'))
  }
  return (
    <div className='form-bg'>
      <form onSubmit={onSub}>
        <h2>Log in!</h2>
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(withRouter(LoginForm));
