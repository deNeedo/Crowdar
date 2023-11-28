import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { styles } from '../styles/welcomeScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';

const { height } = Dimensions.get("window");

export default function Welcome({navigation}) {

	return (
		<SafeAreaView>
			<View>
				<ImageBackground
					style={{
						marginTop: Spacing.Small,
						height: height / 2.5,
					}}
					resizeMode='contain'
					source={require("../assets/images/welcome_img.png")}
				/>
			</View>
			<View 
				style ={{
					paddingHorizontal: Spacing.Small,
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
						fontSize: Sizes.Medium,
						textAlign: "center",
						marginTop: Spacing.xSmall,
						fontFamily: 'Poppins_400Regular',
					}}
				> Your ultimate companion for staying connected at big and crowded events!
				</Text>
			</View>

			<View 
				style={{
					paddingHorizontal: Spacing.xSmall,
					paddingTop: Spacing.Medium,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}
					style={[ 
						styles.button, 
						{ backgroundColor: Colors.Primary }	
					]}
				>
				<Text 
					style={[
						styles.button_text, 
						{ color: Colors.White,
							fontFamily: 'Poppins_600SemiBold',
						}
					]}
					>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Registration')}
					style={[ 
						styles.button, 
						{ backgroundColor: Colors.White }	
					]}
				>
				<Text 
					style={[
						styles.button_text, 
						{ color: Colors.Dark,
							fontFamily: 'Poppins_600SemiBold',
						}
					]}
					>Register</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}