import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
// import auth from './auth';

export default combineReducers({
  categories,
  products,
});
