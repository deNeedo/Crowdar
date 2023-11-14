import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name='Home Screen' component={HomeScreen}/>
			<Stack.Screen name='Login Screen' component={LoginScreen}/>
			{/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} /> */}
			{/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
		</Stack.Navigator>
		</NavigationContainer>
	);
}
