import { supabase } from './SupabaseConfig';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from './Styles';

export const LoginScreen = ({navigation}) => {
	const [status, setStatus] = useState('NOT LOGGED IN!');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	
	const loginTry = async () => {
		// const { data, error } = await supabase.from('users').select()
		const url = supabase.supabaseUrl + 'users';
		const headers = {'apikey': supabase.supabaseKey};
		try {
			const response = await fetch(url, {headers});
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}
			const data = await response.json();
			for (let elem of data) {
				if (elem.login == login && elem.password == password) {
					setStatus('LOGGED IN!');
					break;
				}
				else {
					setStatus('WRONG LOGIN CREDENTIALS!');
				}
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	const logoutTry = async () => {
		setStatus('NOT LOGGED IN!')
	}

	return (
		<View style={Styles.Screen}>
			<TextInput style={Styles.TextInput} placeholder='Enter your login' placeholderTextColor='#dddddd' onChangeText={setLogin} value={login}></TextInput>
			<TextInput style={Styles.TextInput} placeholder='Enter your password' placeholderTextColor='#dddddd' onChangeText={setPassword} value={password}></TextInput>
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
