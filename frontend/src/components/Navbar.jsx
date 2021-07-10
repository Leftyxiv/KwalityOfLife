import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => {
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

export default Navbar;
