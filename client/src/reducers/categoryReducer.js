import { FETCHCATE, CREATECATE } from '../constants/actionTypes';

export default (categories = [], action) => {
  switch (action.type) {
    case FETCHCATE:
      return action.payload;
    case CREATECATE:
      return [...categories, action.payload];
    default:
      return categories;
  }
};
