import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/userReducer";
import requestReducer from "../Reducers/requestReducer";

export default configureStore({
	reducer: {
		user: userReducer,
		request: requestReducer,
	},
});
