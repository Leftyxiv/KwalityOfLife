import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter } from 'react-router';
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
  }
  return (
    <div className='form-bg' id='login-form'>
      <form onSubmit={onSub}>
        <div className='form-group'>
        <h2>Log in!</h2>
      <input type='text'className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <br />
      <input type='password' className='form-control' placeholder='Password'  value={pass} onChange={(e) => setPass(e.target.value)}></input>
      <br />
    <input type='submit' className='btn btn-primary btn-lg' />
        </div>
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
