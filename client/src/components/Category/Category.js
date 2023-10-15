import React from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import CategoryItem from './CategoryItem';

const Category = () => {
  // const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);

  console.log('CATEGORIES:', categories);

  return (
    <div className='category-container'>
      {categories.map((prod) => (
        <CategoryItem product={prod} />
      ))}
    </div>
  );
};

export default Category;
