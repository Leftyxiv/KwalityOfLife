import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { signupUser } from './SignupActions';

const SignupForm = (props) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("")
  
    const login = 'http://127.0.0.1:8000/api/users/'
  
    const onSub = async (e) => {
      e.preventDefault()
      const userData = {
        username,
        password: pass
      }
      // const res = await axios.post(login, userData)
      // console.log(res.data['auth_token'])
      // const cookies = new Cookies()
      // cookies.set('Bearer', res.data['auth_token'])
      // console.log(cookies.get('Bearer'))
      props.signupUser(userData)
    }
    return (
      <div className='form-bg'>
        <form onSubmit={onSub}>
          <h2>Sign Up!</h2>
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
