import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

// import './styles.js';
import useStyles from './styles';
import Product from './Product/Product';

const ProductLists = () => {
  const classes = useStyles();
  const productLists = useSelector((state) => state.products);
  const productList = productLists.filter((p) => p.isSlider !== true);
  console.log('PRODUCTLIST:', productLists);

  return !productLists.length ? (
    <h3>No products to show</h3>
  ) : (
    <Grid
      className={classes.prodContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {productList.map((product) => (
        <Grid key={product._id} item>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductLists;
