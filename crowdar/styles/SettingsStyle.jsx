import {StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Sizes} from '../constants/Sizes';
import {Spacing} from '../constants/Spacing';

export const Styles = StyleSheet.create({
    text_style: {
        fontFamily: 'Poppins_600SemiBold',
        fontFamily: 'Poppins_600SemiBold',
                            color: Colors.White,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
    },

    main_text: {
        fontFamily: 'Poppins_600SemiBold',
                            color: Colors.Black,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
    },

    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '45%',
        borderRadius: 10,
        margin: 10,
        padding: Spacing.xSmall,
        backgroundColor: Colors.Primary,
        marginVertical: Spacing.Small,
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
})