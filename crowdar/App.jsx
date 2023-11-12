import { supabase } from './SupabaseConfig';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
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
  
	useEffect(() => {
		fetchCountries();
	}, []);
  
	return (
		<View style={styles.container}>
			<FlatList
		  		data={countries}
		  		renderItem={({item}) => <Text style={styles.item}> {item.name} </Text>}
		  		keyExtractor={item => item.id.toString()}
			/>
	  	</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	item: {
	padding: 10,
	fontSize: 18,
	height: 44,
	},
});