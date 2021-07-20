import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './LoginActions';

import './Navbar.css';

const Navbar = (props) => {

  const logmeout = () => {
    props.logout()
  }
  let navbar = <ul className='menu'>
  <li><Link to='/'>Home</Link></li>
  <li><Link to='/signup'>Sign Up</Link></li>
  <li><Link to='/login'>Log In</Link></li>
</ul>
  if(localStorage.getItem('token') && localStorage.getItem('user')){
    navbar = <ul className='menu'>
    <li><Link to='/feed'>Home</Link></li>
    <li><Link to='/logout' onClick={logmeout}>Logout</Link></li>
    <li><Link to="#" >Welcome back, {props.auth.user.username}</Link></li>
  </ul>
  }
  return (
    <nav className='head'>
      <div className='head-wrapper'>
        <a className='logo' href='/'><img src="http://127.0.0.1:8000/uploads/kolologo.png" alt='logo' /></a>


      </div>
      {navbar}
    </nav>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { logout })(Navbar);
