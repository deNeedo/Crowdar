import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { Styles } from './Styles';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { height } = Dimensions.get("window");

export const HomeScreen = ({navigation}) => {
	return (
		<SafeAreaView>
			<View>
				<ImageBackground
					style={{
						height: height / 2.5,
					}}
					resizeMode='contain'
					source={require("./assets/images/welcome_img.png")}
				/>
			</View>
			<View 
				style ={{
					paddingHorizontal: 40,
					paddingTop: 40, 
				}}
			>
				<Text
					style ={{
						fontSize: 30,
						textAlign: 'center'
					}}
				>Crowdar - Easy way to locate friends</Text>

				<Text
					style={{
						fontSize: 15,
						textAlign: "center",
						marginTop: 20,
					}}
				> Your ultimate companion for staying connected at big and crowded events! 
				</Text>
			</View>

			<View 
				style={{
					paddingHorizontal: 20,
					paddingTop: 60,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}
					style={{
						backgroundColor: '#36434c',
						paddingVertical: 15,
						paddingHorizontal: 20,
						width: '45%',
						borderRadius: 10,
						margin: 10,
					}}
				>
					<Text 
						style={{
							color: '#fff',
							fontSize: 24,
							textAlign: 'center',
							textTransform: 'capitalize',
						}}
					>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Registration')}
					style={{
						backgroundColor: '#fff',
						paddingVertical: 15,
						paddingHorizontal: 20,
						width: '45%',
						borderRadius: 10,
						margin: 10,
					}}
				>
					<Text 
						style={{
							color: '#000',
							fontSize: 24,
							textAlign: 'center',
							textTransform: 'capitalize',
						}}
					>Register</Text>
				</TouchableOpacity>
			</View>
			

		{/* <TouchableOpacity onPress={() => navigation.navigate('Demo')}>
				<Text style={Styles.Button}> Move to Demo Page </Text>
			</TouchableOpacity>
		</View> */}
		</SafeAreaView>
	);
}
