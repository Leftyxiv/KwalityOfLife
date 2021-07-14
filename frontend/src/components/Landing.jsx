import React from 'react'

import './Landing.css';
import LoginForm from './LoginForm';

const Landing = () => {
  let name = ['']
  if(localStorage.getItem('user')){
    const thisuser = localStorage.getItem('user');
    const regex = /{"username":"(\w+)"}/
    name = thisuser.match(regex)
  }
  return (
    <div>
      {name != '' ? (
        <header className='bg-image'>
          <div className='bg-wrapper'>
            <h1>Kwality of Life!</h1>
            <h2>Where we share all the coolest buys and quality of life upgrades!</h2>
            <LoginForm />
          </div>
        </header>
      ) : (
        <header>Home Page</header>
      )}
      
    </div>
    // <div>
    //   <header className='bg-image'>
    //       <div className='bg-wrapper'>
    //         <h1>Kwality of Life!</h1>
    //         <h2>Where we share all the coolest buys and quality of life upgrades!</h2>
    //         <LoginForm />
    //       </div>
    //   </header>
    // </div>
  )
}

export default Landing;
