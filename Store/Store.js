import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/userReducer";
import requestReducer from "../Reducers/requestReducer";
import calendarReducer from "../Reducers/calendarReducer";
import navigationReducer from "../Reducers/navigationReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer,
    calendar: calendarReducer,
    navigation: navigationReducer,
  },
});
