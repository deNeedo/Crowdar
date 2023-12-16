import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/AuthContext';

import Home from './components/Home'
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
                <>
                    <StatusBar hidden={false} barStyle="dark-content" />
                </>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Registration' component={Registration} />
                    <Stack.Screen name='Account' component={Account} />
                    <Stack.Screen name='Location' component={Location} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
	);
}

