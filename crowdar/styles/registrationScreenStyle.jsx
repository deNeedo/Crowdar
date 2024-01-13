import {StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';

export const Styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: -15
    },
    button_text: {
        fontSize: 20,
		textAlign: 'center',
		textTransform: 'uppercase',
    },

    text_style: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.White,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: Sizes.Medium,
    }
})