import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCodigo, selectUser } from "../Reducers/userReducer";
import {
  selectAllCitas,
  selectResponse,
  setResponse,
  selectBorrarCita,
} from "../Reducers/requestReducer";
import {
  setCitas,
  setAgendar,
  selectNavigation,
} from "../Reducers/navigationReducer";

import { View, Button, Text, StyleSheet, ScrollView } from "react-native";

const borrarCita = (url, mes, dia, hora, codigo, dispatch, allCitas) => {
  axios
    // borra la cita
    .get(`${url}?mes=${mes}&dia=${dia}&hora=${hora}&codigo=${codigo}`)
    .then((res) => {
      // Actualiza la store con todas las citas menos la eliminada
      axios.get(allCitas + `?codigo=${codigo}`).then((response) => {
        if (JSON.stringify(res) !== JSON.stringify(response.data)) {
          dispatch(setResponse(response.data));
        }
        return response.data;
      });
    });
};

const Citas = (props) => {
  const dispatch = useDispatch();
  const codigo = useSelector(selectCodigo);
  const allCitas = useSelector(selectAllCitas);
  const res = useSelector(selectResponse);
  const borrarCitaURL = useSelector(selectBorrarCita);
  const userInfo = useSelector(selectUser);
  const navigationInfo = useSelector(selectNavigation);

  // * Obtenemos todas las citas
  if (userInfo.auth.length > 1) {
    axios.get(allCitas + `?codigo=${codigo}`).then((response) => {
      if (JSON.stringify(res) !== JSON.stringify(response.data)) {
        dispatch(setResponse(response.data));
      }
      return response.data;
    });
  }
  // console.log(res);
  console.log(props);
  return (
    <ScrollView>
      {res.length > 1 ? (
        res.map((cita, index) => {
          return (
            <View style={styles.cita} key={index}>
              <Text>
                {cita.DiaSemana} {cita.Dia} de {cita.Mes} a las {cita.Hora}
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
      ) : (
        <Text>No hay citas</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cita: {
    marginBottom: 20,
  },
});

export default Citas;
