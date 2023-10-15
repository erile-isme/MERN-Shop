import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';

const ProductInfo = () => {
  // const product = useSelector((state) => state.product).filter(
  //   (prod) => prod._id === currId
  // );

  // console.log('PRODUCT: ', product);

  return (
    <div>
      Product Details
      {/* <div className='info-container'>
        Product Details
        <div className='info-smpic'>
          {imginfo.map((img, index) => {
            return <img src={img.smpics} alt='abc' />;
          })}
        </div>
        <div className='info-lgpic'></div>
        <div className='info-product'>
          <div className='title'>{product.title}</div>
          <div className='price'>{product.price}</div>
          <div className='rating'>{product.rating}</div>
          <div className='description'>{product.desciption}</div>
          <div className='size'>{product.name}</div>
          <div className='quantity'>{product.numInStock}</div>
          <button
            className='add-cart'
            type='button'
            onClick={() => {
              console.log('add to cart');
            }}
          ></button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductInfo;
