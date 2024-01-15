import { Dimensions, StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';


export const Buttons = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '45%',
        borderRadius: 10,
        margin: 10,
        padding: Spacing.xSmall,
        backgroundColor: Colors.Primary,
        marginVertical: Spacing.xSmall,
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10
    },

    button_text: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.White,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: Sizes.Medium,
    }
})