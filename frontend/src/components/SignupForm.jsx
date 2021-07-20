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
      // const res = await axios.post(login, userData)
      // console.log(res.data)
      // const cookies = new Cookies()
      // cookies.set('Bearer', res.data['auth_token'])
      // console.log(cookies.get('Bearer'))
      props.signupUser(userData)
    }
    return (
      <div className='form-bg' id='signup-form'> 
      {/* style={{ 'top':'150px'}}> */}
        <form onSubmit={onSub}>
          <div className='form-group'>

          <h2>Sign Up!</h2>
          {/* <label style={{'color': 'black'}}>Username </label> */}
        <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br />
          {/* <label style={{'color': 'black'}}>Password </label> */}
        <input type='password' className='form-control' placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}></input>
        <br />
      <input type='submit' className='btn btn-dark btn-lg' />
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
