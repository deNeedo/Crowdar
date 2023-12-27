// react main features
import React, { useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// connection and authentication
import AuthContext from './AuthContext';
// styling
import { Styles } from '../styles/welcomeScreenStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';

const { height, width } = Dimensions.get("window");

export default function Home({navigation}) {
	const {session, setSession} = useContext(AuthContext)
	const {friends, setFriends} = useState([])

	const createList = () => {
		const elements = friends.map(person =><li>{person}</li>)
		return <ul>{elements}</ul>;
	}

	const fetchFriends = async() => {
		const { data, error } = await supabase.from('profiles').select('friends').eq('id', session.user.id);
		console.log(friends)
		console.log(data[0].friends)
		if (error) {setFriends([]);}
		else {setFriends(data[0].friends);}
	}

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
					<TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('NotificationArea')}>
						<Text> Notifications </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('Settings')}>
						<Text> Settings </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('Location')}>
						<Text> Location </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Styles.button} onPress={fetchFriends}>
						<Text> GetFriends </Text>
					</TouchableOpacity>
					{/* {friends && createList} */}
				</View>
			</SafeAreaView>)
	);
}