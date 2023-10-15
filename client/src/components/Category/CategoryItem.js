import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './styles.css';

const CategoryItem = ({ product }) => {
  console.log(product);
  return (
    <Grid key={product._id} item className='category-item'>
      <img src={product.img} alt={product.name} />
      <div className='category-body'>
        <h1 className='category-title'>{product.name}</h1>
        <p className='category-description'>{product.description}</p>
        <nav>
          <Link to='/products/:category' className='category-link'>
            <button className='category-button' type='button'>
              SHOP NOW
            </button>
          </Link>
        </nav>
      </div>
    </Grid>
  );
};

export default CategoryItem;
