// In App.js in a new project

import * as React from "react";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailScreen";
import CitasScreen from "./Containers/Citas";

import store from "./Store/Store";
import { Provider } from "react-redux";

import { NavigationContainer, Text } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { useSelector, useDispatch } from "react-redux";
import { setAgendar, selectNavigation } from "./Reducers/navigationReducer";
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }, props) {
  const navi = useSelector(selectNavigation);
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Agendar"
        onPress={() => {
          dispatch(setAgendar(true));
          return navigation.navigate("Details");
        }}
      />
      <DrawerItem
        label="Citas"
        onPress={() => {
          dispatch(setAgendar(false));
          console.log(navi);
          return navigation.navigate("Citas");
        }}
      />
      {navi.agendar ? <DrawerItem label="Perra" /> : null}
    </DrawerContentScrollView>
  );
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
