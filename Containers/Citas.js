import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCodigo } from "../Reducers/userReducer";
import {
	selectAllCitas,
	selectResponse,
	setResponse,
	selectBorrarCita,
} from "../Reducers/requestReducer";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";

const borrarCita = (url, mes, dia, hora, codigo, dispatch, allCitas) => {
	axios
		.get(`${url}?mes=${mes}&dia=${dia}&hora=${hora}&codigo=${codigo}`)
		.then(res => {
			axios.get(allCitas + `?codigo=${codigo}`).then(response => {
				if (JSON.stringify(res) !== JSON.stringify(response.data)) {
					dispatch(setResponse(response.data));
				}
				return response.data;
			});
		});
};

const Citas = () => {
	const dispatch = useDispatch();
	const codigo = useSelector(selectCodigo);
	const allCitas = useSelector(selectAllCitas);
	const res = useSelector(selectResponse);
	const borrarCitaURL = useSelector(selectBorrarCita);
	console.log(allCitas);

	axios.get(allCitas + `?codigo=${codigo}`).then(response => {
		if (JSON.stringify(res) !== JSON.stringify(response.data)) {
			dispatch(setResponse(response.data));
		}
		return response.data;
	});

	return (
		<ScrollView>
			{res
				? res.map((cita, index) => {
						return (
							<View style={styles.cita} key={index}>
								<Text>
									{cita.DiaSemana} {cita.Dia} de {cita.Mes} a
									las {cita.Hora}
								</Text>
								<Text>Codigo: {cita.Codigo}</Text>
								<Text>Nombre: {cita.Nombre}</Text>
								<Text>Carrera: {cita.Carrera}</Text>
								<Button
									title="Borrar"
									onPress={() =>
										borrarCita(
											borrarCitaURL,
											cita.Mes,
											cita.Dia,
											cita.Hora,
											cita.Codigo,
											dispatch,
											allCitas
										)
									}
								/>
							</View>
						);
				  })
				: console.log(res)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cita: {
		marginBottom: 20,
	},
});

export default Citas;
