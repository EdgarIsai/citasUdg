import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "calendar",
  initialState: {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    hora: "10:00",
    fecha: "",
  },
  reducers: {
    setHora: (state, action) => {
      state.hora = action.payload;
    },
    setFecha: (state, action) => {
      state.fecha = action.payload;
    },
  },
});

export const { setHora, setFecha } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCalendar = (state) => state.calendar;

export default slice.reducer;
