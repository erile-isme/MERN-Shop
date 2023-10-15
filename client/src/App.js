import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllProducts, getProduct } from './actions/productAction';
import { getCate } from './actions/categoryAction';

import './index.css';
import Home from './components/Home/Home';
import Cart from './components/cart/Cart';
import Payment from './components/Payment/Payment';
import Login from './components/Login/Login';
import Sale from './components/Sale/Sale';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/Products';
import ProductList from './components/Products/ProductList/ProductLists';
import ProductInfo from './components/Products/ProductInfo/ProductInfo';
import Navbar from './components/Navbar/Navbar';
import ProdForm from './components/Form/ProductForm';
import CateForm from './components/Form/CategoryForm';

const App = () => {
  const dispatch = useDispatch();
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    // if (currId) dispatch(getProduct(currId));
    dispatch(fetchAllProducts());
    dispatch(getCate());
  }, [dispatch]);

  // const About = () => <h1>About Us</h1>;

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' component={Payment} />
          <Route path='/login' component={Login} />
          <Route path='/products/:id' component={ProductInfo} />
          <Route path='/products' component={Products} />
          <Route path='/products/:category' component={ProductList} />
          <Route path='/sale' component={Sale} />
          <Route
            path='/addProd'
            component={<ProdForm currId={currId} setCurrId={setCurrId} />}
          />
          <Route path='/addCate' component={CateForm} />
          <Route path='*' component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
