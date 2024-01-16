// react main features
import React, { useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Alert, View, TouchableOpacity, Text, ImageBackground, Dimensions, FlatList, TextInput, PermissionsAndroid} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// connection and authentication
import AuthContext from './AuthContext';
import Geolocation from 'react-native-geolocation-service';
// styling
import { Styles } from '../styles/welcomeScreenStyle';
import { Buttons } from '../styles/ButtonStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';

const { height, width } = Dimensions.get("window");

export default function Home({navigation}) {
	const {session, setSession} = useContext(AuthContext); 
	const [friends, setFriends] = useState([]);
	const [locationSharing, setLocationSharing] = useState(false);

	useEffect(() => {fetchFriends();}, [session, friends])
	useEffect(() => {
		let intervalId;
		if (locationSharing) {intervalId = setInterval(setLocation, 10000)}
		else {clearInterval(intervalId); clearLocation()}
		return () => clearInterval(intervalId);
	}, [locationSharing]);

	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Geolocation Permission',
				message: 'Can we access your location?',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
			);
		   
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	};

	const setLocation = async () => {
		const {data} = await supabase.from('profiles').select('username').eq('id', session.user.id);
		if (data[0].username == null) {Alert.alert("Please specify username in user panel before using the location feature!");}
		else {
			const result = requestLocationPermission();
			result.then(res => {
				if (res) {
					Geolocation.getCurrentPosition(
						async (position) => {
							await supabase.from('profiles').update({location: position.coords}).eq('id', session.user.id);
						},
						(error) => {console.log(error)},
						{enableHighAccuracy: true, timeout: 10000}
					);
				}
			});
		}
    };

	const clearLocation = async () => {
		if (session != null) {
			if (session.user != null) {
				await supabase.from('profiles').update({location: null}).eq('id', session.user.id);
			}
		}
	}

	const fetchFriends = async () => {
		if (session != null) {
			if (session.user != null) {
				const {data, error} = await supabase.from('profiles').select('friends').eq('id', session.user.id);
				if (error) {setFriends([]);}
				else {setFriends(data[0].friends);}
			}
		}
	}

	//////////SEARCH BAR///////////
	const [ users, setUsers ] = useState([]);

	const addFriend = async (username) => {
		const { data } = await supabase.from('profiles').select('friends').eq('id', session.user.id)
		let temp_arr = []; let action = true;
		if (data[0].friends != null) {temp_arr = [...data[0].friends];} 
		temp_arr.forEach((friend) => {if (username == friend) {action = false}})
		if (action) {
			temp_arr.push(username);
			await supabase.from('profiles').update({friends: temp_arr}).eq('id', session.user.id)
		}
		else {Alert.alert("User already on your friend list");}
	}

	const fetchUsers = async (query) => {
		const { data: myData, error: myError } = await supabase
			.from('profiles')
			.select('username')
			.eq('id', session?.user.id)
			.single();
	
		if (myError || !myData) {
			console.error('Error fetching my username:', myError);
			return;
		}

		const myUsername = myData.username;

		const { data, error } = await supabase.from('profiles').select('username').ilike('username', `%${query}%`);
	
		if (!query || query == "") {
			setUsers([]);
			return; 
		}
	
		if (error) {
			console.error('Error fetching users:', error);
			setUsers([]);
		} else {
			const filteredUsers = data.filter(user => user.username != myUsername).map(user => user.username);
	
			setUsers(filteredUsers);
		}
	};
	//////////END OF SEARCH BAR//////////

	return (
		!session ? (
			<SafeAreaView style={Styles.background}>
				<View>
					<ImageBackground style={[Styles.image_background, {marginTop: Spacing.Small}]} resizeMode='contain' source={require("../assets/images/welcome_img.png")}/>
				</View>
				<View style ={{paddingHorizontal: Spacing.Small,}}>
					<Text style ={{fontSize: Sizes.xLarge, textAlign: 'center', fontFamily: 'Poppins_600SemiBold'}}> Crowdar - Easy way to locate friends </Text>
					<Text style={{fontSize: Sizes.Medium, textAlign: "center", marginTop: Spacing.xSmall, marginBottom: Spacing.xLarge, fontFamily: 'Poppins_400Regular'}}> Your ultimate companion for staying connected at big and crowded events! </Text>
				</View>
				<View style={{paddingHorizontal: Spacing.xSmall, paddingTop: Spacing.Medium, flexDirection: 'row', alignItems: 'center'}}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')} style={[Buttons.button, {backgroundColor: Colors.Primary}]}>
						<Text style={[Buttons.button_text, {color: Colors.White, fontFamily: 'Poppins_600SemiBold'}]}> Login </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Registration')} style={[Buttons.button, {backgroundColor: Colors.White}]}>
						<Text style={[Buttons.button_text, {color: Colors.Dark, fontFamily: 'Poppins_600SemiBold'}]}> Register </Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>) : (
			<SafeAreaView style={Styles.background}>
				{/* ##########SEARCH BAR########## */}
				<View style={{
					marginHorizontal: '5%',
					marginVertical: '10%',

				}}>
					<TextInput placeholder='Search for friends' clearButtonMode='always' onChangeText={(query) => fetchUsers(query)} style={{
						paddingHorizontal: 20,
						paddingVertical: 10,
						borderColor: '#000000',
						borderWidth: 2,
						borderRadius: 8,
					}}></TextInput>

					<FlatList
						data={users}
						renderItem={(user) => {
							return (
								<TouchableOpacity style={Buttons.friends} onPress={() => {addFriend(user.item)}}>
									<Text style = {Buttons.button_text}> {user.item} </Text>
								</TouchableOpacity>
							)
						}}
					/>

				</View>
				{/* ##########END OF SEARCH BAR########## */}
				<View>
					<TouchableOpacity style={Buttons.button} onPress={() => navigation.navigate('NotificationArea')}>
						<Text style = {Buttons.button_text}> Notifications </Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={Buttons.button} onPress={() => navigation.navigate('Settings')}>
						<Text style = {Buttons.button_text}> Settings </Text>
					</TouchableOpacity>
				</View>

				<View>
					<TouchableOpacity style={Buttons.button} onPress={() => {!locationSharing ? setLocationSharing(true) : setLocationSharing(false)}}>
						<Text style = {Buttons.button_text}> {locationSharing ? 'STOP SHARING LOCATION' : 'START SHARING LOCATION'} </Text>
					</TouchableOpacity>
				</View>

				<View >
					<FlatList
						data={friends}
						renderItem={(friend) => {
							return (
								<TouchableOpacity style={Buttons.friends} onPress={() => navigation.navigate('Location', {friendName: friend.item, })}>
									<Text style = {Buttons.button_text}> {friend.item} </Text>
								</TouchableOpacity>
							)
						}}
					/>
				</View>
			</SafeAreaView>)
	);
}