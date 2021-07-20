import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signupUser } from './SignupActions';
import './SignupForm.css';

const SignupForm = (props) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("")
  
    const login = 'http://127.0.0.1:8000/api/customuser/'
  
    const onSub = async (e) => {
      e.preventDefault()
      const userData = {
        username,
        password: pass
      }
      props.signupUser(userData)
    }
    return (
      <div className='form-bg' id='signup-form'> 
        <form onSubmit={onSub}>
          <div className='form-group'>

          <h2>Sign Up!</h2>
        <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br />
        <input type='password' className='form-control' placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}></input>
        <br />
      <input type='submit' className='btn btn-primary btn-lg' />
          </div>
    </form>
      </div>
  )
}

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  createUser: state.createUser
})

export default connect(mapStateToProps, {
  signupUser
})(withRouter(SignupForm));
