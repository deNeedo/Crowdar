import { StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Spacing} from '../constants/Spacing';
export const Styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '45%',
        borderRadius: 10,
        margin: 10,
    },

    title: {
        color: Colors.Primary,
        fontFamily: 'Poppins_600SemiBold',
        marginVertical: Spacing.xSmall,
    },
    info_text: {
        color: Colors.Dark,
        textAlign: 'center',
        maxWidth: '90%',
        fontFamily: 'Poppins_600SemiBold'
    }
})
