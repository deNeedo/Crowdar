import { Dimensions, StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';

const { height, width } = Dimensions.get("window");

export const Styles = StyleSheet.create({
    image_background: {
      height: height / 4
    },

    text_style: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.White,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: Sizes.Medium,
    }
})
