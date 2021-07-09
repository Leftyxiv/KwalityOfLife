import React from 'react'

const Navbar = (props) => {
  return (
    <nav className='head'>
      <div className='head-wrapper'>
        <a className='logo' href='/'>Logo</a>

        <ul className='menu'>
          <li><a href='/'>Home</a></li>
          <li><a href='/signup'>Sign Up</a></li>
          <li><a href='/login'>Log In</a></li>
          {/* <li><a href='/'>Home</a></li> */}
        </ul>
      </div>
      
    </nav>
  )
}

export default Navbar;
