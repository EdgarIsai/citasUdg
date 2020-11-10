import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    codigo: "",
    auth: "",
    nombre: "",
    carrera: "",
    calendario: "",
    plantel: "",
  },
  reducers: {
    setCodigo: (state, action) => {
      state.codigo = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.nombre = action.payload.nombre;
      state.carrera = action.payload.carrera;
      state.calendario = action.payload.calendario;
      state.plantel = action.payload.plantel;
    },
  },
});

export const { setCodigo, setAuth, setUser } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCodigo = (state) => state.user.codigo;
export const selectUser = (state) => state.user;

export default slice.reducer;
