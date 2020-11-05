// In App.js in a new project

import * as React from "react";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailScreen";
import CitasScreen from "./Containers/Citas";

import store from "./Store/Store";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Home">
					<Drawer.Screen name="Home" component={HomeScreen} />
					<Drawer.Screen name="Details" component={DetailScreen} />
					<Drawer.Screen name="Citas" component={CitasScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

export default App;
