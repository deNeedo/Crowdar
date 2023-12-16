// react main features
import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// connection and authentication
import { supabase } from '../supabaseClient';
import AuthContext from './AuthContext';
// styling
import { Styles } from '../styles/welcomeScreenStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';

const {height, width} = Dimensions.get("window");

export default function Home({navigation}) {
	const {session, setSession} = useContext(AuthContext)

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
		navigation.navigate('Login');
    };
	
	return (
		!session ? (
			<SafeAreaView>
				<View>
					<ImageBackground style={{marginTop: Spacing.Small, height: height / 2.5}} resizeMode='contain' source={require("../assets/images/welcome_img.png")}/>
				</View>
				<View style ={{paddingHorizontal: Spacing.Small,}}>
					<Text style ={{fontSize: Sizes.xLarge, textAlign: 'center', fontFamily: 'Poppins_600SemiBold'}}> Crowdar - Easy way to locate friends </Text>
					<Text style={{fontSize: Sizes.Medium, textAlign: "center", marginTop: Spacing.xSmall, fontFamily: 'Poppins_400Regular'}}> Your ultimate companion for staying connected at big and crowded events! </Text>
				</View>
				<View style={{paddingHorizontal: Spacing.xSmall, paddingTop: Spacing.Medium, flexDirection: 'row', alignItems: 'center'}}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')} style={[Styles.button, {backgroundColor: Colors.Primary}]}>
						<Text style={[Styles.button_text, {color: Colors.White, fontFamily: 'Poppins_600SemiBold'}]}> Login </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Registration')} style={[Styles.button, {backgroundColor: Colors.White}]}>
						<Text style={[Styles.button_text, {color: Colors.Dark, fontFamily: 'Poppins_600SemiBold'}]}> Register </Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>) : (
			<SafeAreaView>
				<View>
					<TouchableOpacity style={Styles.button} onPress={signOut}>
						<Text> LOG OUT </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Styles.button} onPress={signOut}>
						<Text> LOG OUT </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Styles.button} onPress={signOut}>
						<Text> LOG OUT </Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>)
	);
}