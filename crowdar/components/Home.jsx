// react main features
import React, { useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions, FlatList, TextInput } from 'react-native';
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
	const {session, setSession} = useContext(AuthContext); 
	const [ friends, setFriends ] = useState([]);

	const fetchFriends = async () => {
		const { data, error } = await supabase.from('profiles').select('friends').eq('id', session.user.id);
		if (error) {setFriends([]);}
		else {setFriends(data[0].friends);}
	}

	//////////SEARCH BAR///////////
	const [ users, setUsers ] = useState([]);

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

			console.log(filteredUsers);
	
			setUsers(filteredUsers);
		}
	};
	//////////END OF SEARCH BAR//////////

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
				{/* ##########SEARCH BAR########## */}
				<View style={{
					marginHorizontal: '5%',
					marginVertical: '10%',

				}}>
					<TextInput placeholder='Search for friends' clearButtonMode='always' onChangeText={(query) => fetchUsers(query)} style={{
						paddingHorizontal: 20,
						paddingVertical: 10,
						borderColor: '#ccc',
						borderWidth: 1,
						borderRadius: 8,
					}}></TextInput>

					<FlatList
						data={users}
						renderItem={(user) => {
							return (
								<TouchableOpacity style={Styles.button}>
									<Text> {user.item} </Text>
								</TouchableOpacity>
							)
						}}
					/>

				</View>
				{/* ##########END OF SEARCH BAR########## */}
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
					<TouchableOpacity style={Styles.button} onPress={fetchFriends}>
						<Text> GetFriends </Text>
					</TouchableOpacity>

					<FlatList
						data={friends}
						renderItem={(friend) => {
							return (
								<TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('Location', {userId: friend.item})}>
									<Text> {friend.item} </Text>
								</TouchableOpacity>
							)
						}}
					/>
				</View>
			</SafeAreaView>)
	);
}