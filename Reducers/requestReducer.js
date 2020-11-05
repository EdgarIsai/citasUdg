import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
	name: "request",
	initialState: {
		base: "3",
		allCitas:
			"https://eiscprograparainternet.000webhostapp.com/VerCitas.php",
		borrarCita:
			"https://eiscprograparainternet.000webhostapp.com/BajasCitas.php",
		response: "",
	},
	reducers: {
		setResponse: (state, action) => {
			state.response = action.payload;
		},
	},
});

export const { setResponse } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllCitas = state => state.request.allCitas;
export const selectResponse = state => state.request.response;
export const selectBorrarCita = state => state.request.borrarCita;

export default slice.reducer;
