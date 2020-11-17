// In App.js in a new project

import React from "react";

import { Button, View, Text } from "react-native";
import { Picker } from "react-native"; // *! Deprecated

import axios from "axios";
import CalendarPicker from "react-native-calendar-picker";

import { useSelector, useDispatch } from "react-redux";
// * Request Reducer
import { setResponse } from "../Reducers/requestReducer";
import { selectRequests } from "../Reducers/requestReducer";
// * User Reducer
// * Calendar Reducer
import { selectCalendar, setHora, setFecha } from "../Reducers/calendarReducer";
// * Navigation Reducer
import { selectNavigation } from "../Reducers/navigationReducer";

function Editar({ route, navigation }) {
  const { hora, dia, diaSemana, mes, codigo } = route.params;

  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const calendarInfo = useSelector(selectCalendar);

  const agendar = (dispatch) => {
    // * Function expression to modify the selected appointment
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
    const ndia = new Date(calendarInfo.fecha);
    // * Edits the appointment
    axios
      .get(requests.editarCita, {
        params: {
          hora: hora,
          dia: dia,
          diasemana: diaSemana,
          mes: mes,
          codigo: codigo,
          ndiasemana: days[ndia.getDay()],
          nmes: months[ndia.getMonth()],
          ndia: ndia.getDate(),
          nhora: calendarInfo.hora,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setResponse(""));
        navigation.navigate("Citas");
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  };

  let startDate = calendarInfo.fecha ? calendarInfo.fecha.toString() : "";
  startDate = startDate.split(" ").slice(0, 4).join(" ");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Editar Cita del {`${diaSemana} ${dia} ${mes}`}</Text>
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
    </View>
  );
}

export default Editar;
