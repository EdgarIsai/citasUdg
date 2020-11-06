import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "navigation",
  initialState: {
    citas: false,
    agendar: false,
  },
  reducers: {
    setCitas: (state, action) => {
      state.citas = action.payload;
    },
    setAgendar: (state, action) => {
      state.agendar = action.payload;
    },
  },
});

export const { setCitas, setAgendar } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNavigation = (state) => state.navigation;

export default slice.reducer;
