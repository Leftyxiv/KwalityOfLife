import React from 'react'

import './Landing.css';
import LoginForm from './LoginForm';

const Landing = (props) => {
  const Component = props.Component;
  return (
    // <div>
    //   {!name ? (
    //     <header className='bg-image'>
    //       <div className='bg-wrapper'>
    //         <h1>Kwality of Life!</h1>
    //         <h2>Where we share all the coolest buys and quality of life upgrades!</h2>
    //         <LoginForm />
    //       </div>
    //     </header>
    //   ) : (
    //     <h1>Home Page</h1>
    //   )}
      
    // </div>
    <div>
      <header className='bg-image'>
        <div className='bg-wrapper'>
          <h1>Kwality of Life!</h1>
          <h2>Where we share all the coolest buys and quality of life upgrades!</h2>
          <Component />
        </div>
      </header>
    </div>
  )
}

export default Landing;
