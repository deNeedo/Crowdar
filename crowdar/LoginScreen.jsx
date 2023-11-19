import { supabase } from './SupabaseConfig';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from './Styles';
import sha256 from 'sha256';

export const LoginScreen = ({navigation}) => {
	const [status, setStatus] = useState('NOT LOGGED IN!');
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	
	const loginTry = async () => {
		const { data, error } = await supabase.from('users').select();
		if (error) {console.error('Fetch error:', error);}
		else {
			let secure_pass = sha256(pass);
			for (let elem of data) {
				if (elem.username == login && elem.password == secure_pass) {setStatus('LOGGED IN!'); break;}
				else {setStatus('WRONG LOGIN CREDENTIALS!');}
			}
		}
	}

	const logoutTry = async () => {setStatus('NOT LOGGED IN!')}

	return (
		<View style={Styles.Screen}>
			<TextInput style={Styles.Input} placeholder='Enter your login' placeholderTextColor='#dddddd' onChangeText={setLogin} value={login} />
			<TextInput style={Styles.Input} placeholder='Enter your password' placeholderTextColor='#dddddd' onChangeText={setPass} value={pass} secureTextEntry = {true} />
			<TouchableOpacity onPress={loginTry}>
				<Text style={Styles.Button}> LOG IN </Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={logoutTry}>
				<Text style={Styles.Button}> LOG OUT </Text>
			</TouchableOpacity>
			<Text style={status == 'LOGGED IN!' ? Styles.TextSuccess : Styles.TextError}> {status} </Text>
		</View>
	);
}
