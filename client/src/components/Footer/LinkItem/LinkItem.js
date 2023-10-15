import React from 'react';
import { Link } from 'react-router-dom';

const LinkItem = ({ icon, name, href }) => {
  return (
    <div>
      <div className='link-items'>
        <Link to={href} className='link-item'>
          {icon}
          <span>{name}</span>
        </Link>
      </div>
    </div>
  );
};

export default LinkItem;
