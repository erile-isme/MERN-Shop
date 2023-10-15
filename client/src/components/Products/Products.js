import React from 'react';
import ProductList from './ProductList/ProductLists';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';
import Copyright from '../Copyright/Copyright';

const Products = ({ category }) => {
  return (
    <div>
      {/* <h1>{category}</h1> */}
      <div className='filter'>Filter</div>
      <ProductList />
      <Newsletter />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Products;
