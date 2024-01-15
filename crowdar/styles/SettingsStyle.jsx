import { StyleSheet } from "react-native";
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';

export const Styles = StyleSheet.create({
    text_style: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.Black,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: Sizes.xLarge,
    }
})