import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import './styles.css';

const Product = ({ product }) => {
  //   const classes = useStyles();
  //   const dispatch = useDispatch();

  return (
    <Card key={product._id} className='product-info' variant='outlined'>
      <img
        className='product-img'
        src={product.img}
        alt={product.description}
      />
      <nav>
        <div className='product-icon'>
          <div className='search-icon'>
            <Link
              to={`/products/${product._id}`}
              className='product-link'
              // onClick={() => setCurrId(product._id)}
            >
              <SearchOutlinedIcon />
            </Link>
          </div>
          <div className='fav-icon'>
            <Link to='/productfav' className='product-link'>
              <FavoriteBorderOutlinedIcon />
            </Link>
          </div>
          <div className='cart-icon'>
            <Link to='/cart' className='product-link'>
              <ShoppingCartOutlinedIcon />
            </Link>
          </div>
        </div>
      </nav>
    </Card>
  );
};

export default Product;
