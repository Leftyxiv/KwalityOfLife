import React from 'react'

import './Landing.css';
import LoginForm from './LoginForm';

const Landing = () => {
  return (
    <div>
      <header className='bg-image'>
        <div className='bg-wrapper'>
          <h1>Kwality of Life!</h1>
          <h2>Where we share all the coolest buys and quality upgrades!</h2>
          <LoginForm />
        </div>
      </header>
    </div>
  )
}

export default Landing;
