import React from 'react';
import Category from '../Category/Category';
import ProductLists from '../Products/ProductList/ProductLists';
import Slider from '../Slider/Slider';
import Copyright from '../Copyright/Copyright';
import Footer from '../Footer/Footer';
import Newsletter from '../Newsletter/Newsletter';

const Home = () => {
  return (
    <div>
      <Slider />
      <Category />
      <ProductLists />
      <Newsletter />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Home;
