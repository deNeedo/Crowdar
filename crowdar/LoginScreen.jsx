import { supabase } from './SupabaseConfig';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Styles } from './Styles';
import { Button } from 'react-native-elements';

export const LoginScreen = ({navigation}) => {
	const [countries, setCountries] = useState([]);
	const fetchCountries = async () => {
		const url = supabase.supabaseUrl + '/countries';
		const headers = {'apikey': supabase.supabaseKey};
		try {
			const response = await fetch(url, { headers });
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setCountries(data);
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	const clearCountries = () => {
		setCountries([]);
	}
	
	// useEffect(() => {fetchCountries();}, []);

	return (
		<View style={Styles.Screen}>
			<Button title='Get Countries' onPress={fetchCountries}/>
			<Button title='Clear Countries' onPress={clearCountries}/>
			<FlatList
		  		data={countries}
		  		renderItem={({item}) => <Text> {item.name} </Text>}
		  		keyExtractor={item => item.id.toString()}
			/>
		</View>
	);
}
