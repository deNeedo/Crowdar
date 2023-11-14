import { supabase } from './SupabaseConfig';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Styles } from './Styles';

export const DemoScreen = ({navigation}) => {
	const [data, setData] = useState([]);
	
	const fetchCountries = async () => {
		// const { data, error } = await supabase.from('countries').select()
		const url = supabase.supabaseUrl + 'countries';
		const headers = {'apikey': supabase.supabaseKey};
		try {
			const response = await fetch(url, {headers});
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}
			const data = await response.json();
            setData(data);
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	const clearCountries = async () => {
		setData([]);
	}

	return (
		<View style={Styles.Screen}>
			<TouchableOpacity onPress={fetchCountries}>
				<Text style={Styles.Button}> GET DATA </Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={clearCountries}>
				<Text style={Styles.Button}> CLEAR DATA </Text>
			</TouchableOpacity>
            <FlatList style={Styles.List} data={data} renderItem={({item}) => <Text style={Styles.TextList}> {item.name} </Text>} keyExtractor={item => item.id.toString()}/>
            <TouchableOpacity onPress={() => navigation.push('Demo')}>
				<Text style={Styles.Button}> Move to Demo Page </Text>
			</TouchableOpacity>
		</View>
	);
}
