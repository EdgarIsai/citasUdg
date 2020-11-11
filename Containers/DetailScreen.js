// In App.js in a new project

import React, { useEffect } from "react";

import { Button, View, Text } from "react-native";
import { Picker } from "react-native"; // *! Deprecated

import axios from "axios";
import CalendarPicker from "react-native-calendar-picker";

import { useSelector, useDispatch } from "react-redux";
// * Request Reducer
import { setResponse } from "../Reducers/requestReducer";
import { selectRequests } from "../Reducers/requestReducer";
// * User Reducer
import { setAuth, selectUser, setUser } from "../Reducers/userReducer";
// * Calendar Reducer
import { selectCalendar, setHora, setFecha } from "../Reducers/calendarReducer";
// * Navigation Reducer
import { selectNavigation } from "../Reducers/navigationReducer";

function DetailsScreen({ route, navigation }) {
  useEffect(() => {
    // * Query the user info only when the component mounts
    axios
      .get(requests.datosUdg, {
        params: {
          codigo: user,
          nip: password,
        },
      })
      .then((response) => {
        dispatch(setAuth(response.data));
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }, [route.params]);

  const { user, password } = route.params;

  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const userInfo = useSelector(selectUser);
  const calendarInfo = useSelector(selectCalendar);

  const naviInfo = useSelector(selectNavigation);

  const agendar = (dispatch) => {
    const months = [
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
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dia = new Date(calendarInfo.fecha);
    // * Registers the appointment

    axios
      .get(requests.altasCitas, {
        params: {
          diasemana: days[dia.getDay()],
          mes: months[dia.getMonth()],
          dia: dia.getDate(),
          hora: calendarInfo.hora,
          codigo: codigo,
          nombre: nombre,
          carrera: carrera,
        },
      })
      .then((response) => {
        response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    dispatch(setResponse(""));
  };

  let startDate = calendarInfo.fecha ? calendarInfo.fecha.toString() : "";
  startDate = startDate.split(" ").slice(0, 4).join(" ");

  let calendario,
    codigo,
    nombre,
    plantel,
    carrera = "";
  // * Dispatches user info if any
  if (userInfo.auth.length > 0) {
    [calendario, codigo, nombre, plantel, carrera] = userInfo.auth.split(",");
    dispatch(
      setUser({
        nombre: nombre,
        calendario: calendario,
        plantel: plantel,
        carrera: carrera,
      })
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {userInfo.auth.length > 1 ? (
        <View>
          <CalendarPicker
            onDateChange={(date) => dispatch(setFecha(date.toString()))}
          />
          <Button onPress={agendar.bind(this, dispatch)} title="Agendar" />
          <View>
            <Text>SELECTED DATE:{startDate}</Text>
          </View>
          <Picker
            selectedValue={calendarInfo.hora}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => dispatch(setHora(itemValue))}
          >
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="11:00" value="11:00" />
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="13:00" value="13:00" />
            <Picker.Item label="14:00" value="14:00" />
            <Picker.Item label="15:00" value="15:00" />
            <Picker.Item label="16:00" value="16:00" />
            <Picker.Item label="17:00" value="17:00" />
            <Picker.Item label="18:00" value="18:00" />
            <Picker.Item label="19:00" value="19:00" />
            <Picker.Item label="20:00" value="20:00" />
          </Picker>
        </View>
      ) : null}

      <Text>{userInfo.auth}</Text>
    </View>
  );
}

export default DetailsScreen;
