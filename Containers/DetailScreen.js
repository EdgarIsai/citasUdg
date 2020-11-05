// In App.js in a new project

import React, { useState, useEffect } from "react";

import CalendarPicker from "react-native-calendar-picker";
import { useSelector, useDispatch } from "react-redux";
import { setResponse } from "../Reducers/requestReducer";

import { Button, View, Text } from "react-native";
import { Picker } from "react-native";
import axios from "axios";

import { setCodigo, selectCodigo } from "../Reducers/userReducer";

function DetailsScreen({ route, navigation }) {
	useEffect(() => {
		axios
			.get(url)
			.then(response => {
				console.log(333);
				setResponseState(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
				console.log("termino");
			});
	}, [route.params]);
	const { user, password } = route.params;
	const [responseState, setResponseState] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState("10:00");

	const dispatch = useDispatch();

	url = `https://cuceimobile.tech/Escuela/datosudeg.php?codigo=${user}&nip=${password}`;
	const changeDate = date => {
		setSelectedDate(date);
	};

	const agendar = dispatch => {
		if (responseState.split(",").length > 0) {
			[
				calendario,
				codigo,
				nombre,
				plantel,
				carrera,
			] = responseState.split(",");
		}
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
		const dia = new Date(selectedDate);
		console.log(
			days[dia.getDay()],
			selectedTime,
			months[dia.getMonth()],
			dia.getDate()
		);
		axios
			.get(
				`https://eiscprograparainternet.000webhostapp.com/AltasCitas.php?diasemana=${
					days[dia.getDay()]
				}&mes=${
					months[dia.getMonth()]
				}&dia=${dia.getDate()}&hora=${selectedTime}&codigo=${codigo}&nombre=${nombre}&carrera=${carrera}`
			)
			.then(response => {
				response.data;
			})
			.catch(err => {
				console.log(err);
				throw err;
			});
		dispatch(setResponse(""));
	};

	let codi = useSelector(selectCodigo);
	let startDate = selectedDate ? selectedDate.toString() : "";
	startDate = startDate.split(" ").slice(0, 4).join(" ");

	let calendario,
		codigo,
		nombre,
		plantel,
		carrera = "";
	console.log(responseState);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CalendarPicker onDateChange={date => setSelectedDate(date)} />
			<Button onPress={agendar.bind(this, dispatch)} title="Agendar" />
			<View>
				<Text>SELECTED DATE:{startDate}</Text>
			</View>
			<Picker
				selectedValue={selectedTime}
				style={{ height: 50, width: 100 }}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedTime(itemValue)
				}>
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
			<Text>
				{responseState}
				{codi}
			</Text>
		</View>
	);
}

export default DetailsScreen;
