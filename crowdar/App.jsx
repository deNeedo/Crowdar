import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
import { DemoScreen } from './DemoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home Screen' }} />
				<Stack.Screen name='Login' component={LoginScreen} options={{ title: 'Login Screen' }} />
				<Stack.Screen name='Demo' component={DemoScreen} options={{ title: 'Demo Screen' }} />
				{/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
