// In App.js in a new project

import * as React from "react";
import { Text } from "react-native";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailScreen";
import CitasScreen from "./Containers/Citas";

import store from "./Store/Store";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { useSelector, useDispatch } from "react-redux";
// * User Reducer
import { selectUser } from "./Reducers/userReducer";
// * Navigation Reducer
import { setAgendar, selectNavigation } from "./Reducers/navigationReducer";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }, props) {
  const navi = useSelector(selectNavigation);
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();

  let sideBar = (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Agendar"
        onPress={() => {
          dispatch(setAgendar(true));
          return navigation.navigate("Details");
        }}
      />
      <Text>{user.nombre}</Text>
      <Text>Codigo: {user.codigo}</Text>
      <Text>Plantel: {user.plantel}</Text>
      <Text>Carrera: {user.carrera}</Text>
      <Text>Calendario: {user.calendario}</Text>
    </DrawerContentScrollView>
  );

  if (navi.agendar) {
    sideBar = (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Citas"
          onPress={() => {
            dispatch(setAgendar(false));
            return navigation.navigate("Citas");
          }}
        />
        <Text>{user.nombre}</Text>
        <Text>Codigo: {user.codigo}</Text>
        <Text>Plantel: {user.plantel}</Text>
        <Text>Carrera: {user.carrera}</Text>
        <Text>Calendario: {user.calendario}</Text>
      </DrawerContentScrollView>
    );
  }

  return sideBar;
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
            component={HomeScreen}
          />
          <Drawer.Screen name="Details" component={DetailScreen} />
          <Drawer.Screen name="Citas" component={CitasScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
