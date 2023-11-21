// import React from 'react';
// import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { LoginScreen } from './components/LoginScreen';
// import { RegistrationScreen } from './components/RegistrationScreen';
// import { DemoScreen } from './components/DemoScreen';
//const Stack = createNativeStackNavigator();
// export default function App() {
// 	let [fontsLoaded, fontError] = useFonts({
// 		Poppins_400Regular,
// 		Poppins_600SemiBold,
// 		Poppins_700Bold,
// 	});
// 	if (!fontsLoaded && !fontError) {
// 		return null;
// 	}
// 	return (
// 	// 	<NavigationContainer>
// 	// 		<Stack.Navigator screenOptions={{headerShown: false}}>
// 	// 			<Stack.Screen name='Welcome' component={WelcomeScreen} />
// 	// 			<Stack.Screen name='Login' component={LoginScreen}/>
// 	// 			<Stack.Screen name='Registration' component={RegistrationScreen} />
// 	// 			<Stack.Screen name='Demo' component={DemoScreen} />
// 	// 			{/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
// 	// 		</Stack.Navigator>
// 	// 	</NavigationContainer>
// 	);
// }
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Login';
import Account from './components/Account';
import { View } from 'react-native';
export default function App() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    return (<View>
    	{session && session.user ? <Account key={session.user.id} session={session}/> : <Auth />}
    </View>);
}
