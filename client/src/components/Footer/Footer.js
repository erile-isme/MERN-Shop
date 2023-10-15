import React from 'react';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import LocalPhoneRoundedIcon from '@material-ui/icons/LocalPhoneRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LinkItem from './HyperlinkItem';
import './styles.css';

const Footer = () => {
  return (
    <div>
      <div className='footer-container'>
        <div className='footer-info'>
          <div className='footer-about'>
            <div className='footer-title'>eri.</div>
            <p>
              Description about my shop which I don't know what to write. Maybe
              I like blue so here is my mern shop.
            </p>
          </div>
          <div className='footer-social'>
            <a href='https://twitter.com/'>
              <i className='twitter icon'></i>
            </a>
            <a href='https://instagram.com/'>
              <i className='instagram icon'></i>
            </a>
            <a href='https://facebook.com/'>
              <i className='facebook icon'></i>
            </a>
          </div>
        </div>
        <div className='footer-links'>
          <div className='footer-title'>Useful Links</div>
          <div className='useful-links'>
            <div className='account'>
              <LinkItem key='1' href='ab' name='Home' />
              <LinkItem key='2' href='ab' name='Cart' />
              <LinkItem key='3' href='ab' name='My Account' />
              <LinkItem key='4' href='ab' name='Terms' />
            </div>
            <div className='links'>
              <LinkItem key='5' href='ab' name='Women Clothes' />
              <LinkItem key='6' href='ab' name='Women Shoes' />
              <LinkItem key='7' href='ab' name='Accessories' />
              <LinkItem key='8' href='ab' name='Wishlist' />
            </div>
          </div>
        </div>
        <div className='footer-contacts'>
          <div className='footer-title'>Contact Us</div>
          <div className='footer-contact'>
            <LocationOnRoundedIcon />
            <LinkItem
              key='9'
              href='google map api'
              name='123 Abc Street A1B2C3 Canada'
            />
          </div>
          <div className='footer-contact'>
            <LocalPhoneRoundedIcon />
            <LinkItem key='10' href='abcd' name='123-456-7890' />
          </div>
          <div className='footer-contact'>
            <EmailRoundedIcon />
            <LinkItem
              key='11'
              href='eri.shop@gmail.com'
              name='eri.shop@gmail.com'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
