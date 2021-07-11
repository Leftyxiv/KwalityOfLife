import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './LoginActions';

import './Navbar.css';
import { propTypes } from 'react-bootstrap/esm/Image';

const Navbar = (props) => {

  const logmeout = () => {
    props.logout()
  }
  console.log(props)
  let navbar = <ul className='menu'>
  <li><Link to='/'>Home</Link></li>
  <li><Link to='/signup'>Sign Up</Link></li>
  <li><Link to='/login'>Log In</Link></li>
  {/* <li><a href='/'>Home</a></li> */}
</ul>
  if(localStorage.getItem('token') && localStorage.getItem('user')){
    navbar = <ul className='menu'>
    <li><Link to='/feed'>Home</Link></li>
    <li><Link to='/logout'>Logout</Link></li>
    <li><Link to="#" onClick={logmeout}>Welcome back, {props.auth.user.username}</Link></li>
    {/* <li><a href='/'>Home</a></li> */}
  </ul>
  }
  return (
    <nav className='head'>
      <div className='head-wrapper'>
        <a className='logo' href='/'>Logo</a>


      </div>
      {navbar}
    </nav>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { logout })(Navbar);
