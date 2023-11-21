import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { styles } from '../styles/welcomeScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';

const { height } = Dimensions.get("window");

export const WelcomeScreen = ({navigation}) => {

	return (
		<SafeAreaView>
			<View>
				<ImageBackground
					style={{
						marginTop: 50,
						height: height / 2.5,
					}}
					resizeMode='contain'
					source={require("../assets/images/welcome_img.png")}
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
						fontSize: Sizes.xLarge,
						textAlign: 'center',
						fontFamily: 'Poppins_600SemiBold',
					}}
				>Crowdar - Easy way to locate friends
				</Text>

				<Text
					style={{
						fontSize: Sizes.medium,
						textAlign: "center",
						marginTop: 20,
						fontFamily: 'Poppins_400Regular',
					}}
				> Your ultimate companion for staying connected at big and crowded events!
				</Text>
			</View>

			<View 
				style={{
					paddingHorizontal: 20,
					paddingTop: 65,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}
					style={[ 
						styles.button, 
						{ backgroundColor: Colors.primary }	
					]}
				>
				<Text 
					style={[
						styles.button_text, 
						{ color: Colors.white,
							fontFamily: 'Poppins_600SemiBold',
						}
					]}
					>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Registration')}
					style={[ 
						styles.button, 
						{ backgroundColor: Colors.white }	
					]}
				>
				<Text 
					style={[
						styles.button_text, 
						{ color: Colors.dark,
							fontFamily: 'Poppins_600SemiBold',
						}
					]}
					>Register</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}