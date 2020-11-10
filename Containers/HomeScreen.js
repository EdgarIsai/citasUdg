// In App.js in a new project

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCodigo } from "../Reducers/userReducer";
import udgIcon from "../Images/udg.png";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text, TextInput, Image } from "react-native";

import { setCitas, setAgendar } from "../Reducers/navigationReducer";

function HomeScreen({ navigation }) {
  const [usuarioState, setUsuarioState] = useState("");
  const [contrasenaState, setContrasenaState] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={udgIcon} style={{ height: 80, width: 50 }} />
      <Text>Codigo</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 100,
        }}
        keyboardType="phone-pad"
        onChangeText={(text) => setUsuarioState(text)}
      />
      <Text>Nip</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 100,
        }}
        secureTextEntry={true}
        onChangeText={(text) => setContrasenaState(text)}
      />
      <Button
        title="Entrar"
        onPress={() => {
          dispatch(setCodigo(usuarioState));
          dispatch(setAgendar(true));
          navigation.navigate("Details", {
            user: usuarioState,
            password: contrasenaState,
          });
        }}
      />
    </View>
  );
}

export default HomeScreen;
