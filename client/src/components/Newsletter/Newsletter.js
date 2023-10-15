import React from 'react';
import './styles.css';

const Newsletter = () => {
  return (
    <div>
      <div className='newsletter-container'>
        <div className='newsletter-body'>
          <div className='newsletter-title'>Newsletter.</div>
          <div className='newsletter-description'>
            Subscribe to our newsletter to receive the latest news and get 10%
            OFF for the first order.
          </div>
          <div className='newsletter-email'>
            <input
              className='newsletter-input'
              type='text'
              placeholder='Type your email here'
            ></input>
            <button className='newsletter-btn'>Email us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
