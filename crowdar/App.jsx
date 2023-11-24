import 'react-native-url-polyfill/auto';
import React from 'react';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/AuthContext';

import Welcome from './components/Welcome'
import Login from './components/Login';
import Account from './components/Account';
import Registration from './components/Registration'
import Location from './components/Location'

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
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Location' component={Location} />
                    <Stack.Screen name='Welcome' component={Welcome} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Registration' component={Registration} />
                    <Stack.Screen name='Account' component={Account} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
	);
}

