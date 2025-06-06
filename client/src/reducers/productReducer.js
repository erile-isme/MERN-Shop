import {
	FETCH_ALL,
	CREATEPROD,
	GETPROD,
	FINDPROD,
	GETPROD_CATE,
	FETCH_SLIDER,
} from "../shared/actionTypes";

const products = (state = { products: [], slider: [] }, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return { ...state, products: action.payload };
		case FETCH_SLIDER:
			return { ...state, slider: action.payload };
		case CREATEPROD:
			return { ...state, products: [...state.products, action.payload] };
		case GETPROD:
			return { ...state, product: action.payload };
		case FINDPROD:
			return { ...state, searchedProducts: action.payload };
		case GETPROD_CATE:
			return { ...state, products: action.payload };
		default:
			return state;
	}
};

export default products;
