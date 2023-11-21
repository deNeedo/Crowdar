import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import React from 'react';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/AuthContext';

import Welcome from './components/Welcome'
import Login from './components/Login';
import Account from './components/Account';
import Registration from './components/Registration'

const Stack = createNativeStackNavigator();
export default function App() {

    // const [session, setSession] = useState(null);
    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         setSession(session);
    //     });
    //     supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session);
    //     });
    // }, []);

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
                    <Stack.Screen name='Welcome' component={Welcome} />
                    <Stack.Screen name='Login' component={Login} />
                    {/* <Stack.Screen name='Login'> {(props) => <Login {...props} session={session}/>}</Stack.Screen> */}
                    <Stack.Screen name='Registration' component={Registration} />
                    <Stack.Screen name='Account' component={Account} />
                    {/* <Stack.Screen name='Account' component={Account} initialParams={{ session: session }} /> */}
                    {/* <Stack.Screen name="Home"> {(props) => <HomeScreen {...props} extraData={someData} />} </Stack.Screen> */}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
	);
}

// import 'react-native-url-polyfill/auto';
// import { useState, useEffect } from 'react';
// import { supabase } from './supabaseClient';
// import Login from './components/Login';
// import Account from './components/Account';
// import Registration from './components/Registration'
// import { View } from 'react-native';
// export default function App() {
//     const [session, setSession] = useState(null);
//     useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session);
//         });
//         supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//         });
//     }, []);
//     return (<View>
//         {session && session.user ? <Account key={session.user.id} session={session}/> : <Login />}
//     </View>);
// }
