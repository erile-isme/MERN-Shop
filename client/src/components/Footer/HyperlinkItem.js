import React from 'react';
import './styles.css';

const HyperlinkItem = ({ href, name }) => {
  return (
    <div>
      <div className='hyperlink-item'>
        <a href={href}>{name}</a>
      </div>
    </div>
  );
};

export default HyperlinkItem;
