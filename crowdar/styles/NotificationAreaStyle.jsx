import {StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';

export const Styles = StyleSheet.create({
    text_style: {
        fontFamily: 'Poppins_600SemiBold',
                            color: Colors.black,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
    }
})