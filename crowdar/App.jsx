import React from 'react';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { DemoScreen } from './screens/DemoScreen';

const Stack = createNativeStackNavigator();



export default function App() {

	let [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold,
	});
	
	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name='Welcome' component={WelcomeScreen} />
				<Stack.Screen name='Login' component={LoginScreen}/>
				<Stack.Screen name='Registration' component={RegistrationScreen} />
				<Stack.Screen name='Demo' component={DemoScreen} />
				{/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
