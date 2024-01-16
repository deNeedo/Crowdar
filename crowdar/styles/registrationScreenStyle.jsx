import {StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';

export const Styles = StyleSheet.create({
    background: {
		backgroundColor: '#dee3e0',
		height: '100%',
		width: '100%',
	},
    
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: -15
    },
    text_style: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.White,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: Sizes.Medium,
    },
    redirect: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#000980',
        textAlign: 'center',
        fontSize: Sizes.Medium,
        textDecorationLine: 'underline'
    },
})