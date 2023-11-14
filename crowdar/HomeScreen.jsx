import React from 'react';
import { View, Button } from 'react-native';
import { Styles } from './Styles';

export const HomeScreen = ({navigation}) => {
	return (
		<View style={Styles.Screen}>
			<Button title='Move to Login Page' onPress={() => navigation.navigate('Login Screen')}/>
		</View>
	);
}
