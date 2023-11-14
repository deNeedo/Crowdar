import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Styles } from './Styles';

export const HomeScreen = ({navigation}) => {
	return (
		<View style={Styles.Screen}>
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text style={Styles.Button}> Move to Login Page </Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Demo')}>
				<Text style={Styles.Button}> Move to Demo Page </Text>
			</TouchableOpacity>
		</View>
	);
}
