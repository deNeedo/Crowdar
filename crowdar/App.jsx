import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
import { RegistrationScreen } from './RegistrationScreen';
import { DemoScreen } from './DemoScreen';

const Stack = createNativeStackNavigator();



export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Login' component={LoginScreen}/>
				<Stack.Screen name='Registration' component={RegistrationScreen} />
				<Stack.Screen name='Demo' component={DemoScreen} />
				{/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
