import {
	LOGIN,
	REGISTER,
	LOGIN_ERROR,
	REGISTER_ERROR,
	GET_USER,
} from "../constants/actionTypes";

const user = (user = [], action) => {
	switch (action.type) {
		case GET_USER:
			return action.payload.user;
		case LOGIN:
			return {
				...user,
				message: action.payload.message,
				token: action.payload.token,
				isAuthenticated: true,
				error: null,
			};
		case LOGIN_ERROR:
			return {
				...user,
				error: action.payload,
			};
		case REGISTER:
			return {
				message: action.payload.message,
				token: action.payload.token,
				isRegistered: action.payload.userAdded,
				isAuthenticated: false,
				error: null,
			};
		case REGISTER_ERROR:
			return {
				isRegistered: action.payload.userAdded,
				isAuthenticated: false,
				error: action.payload.message,
			};
		default:
			return user;
	}
};

export default user;
