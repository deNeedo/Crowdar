import { StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Spacing} from '../constants/Spacing';
import { Sizes } from '../constants/Sizes';
export const Styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '45%',
        borderRadius: 10,
        margin: 10,
    },

    background: {
		backgroundColor: '#dee3e0',
		height: '100%',
		width: '100%',
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
    },
    text_input: {
        fontSize: Sizes.Medium,
        color: Colors.Dark,
        fontFamily: 'Poppins_400Regular',
        padding: '3%',
        backgroundColor: Colors.Gray,
        borderRadius: 10,
        marginVertical: Spacing.xSmall,
    },
    forgot_pass: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: Sizes.Small,
        color: Colors.Dark,
        alignSelf: 'flex-end'
    },
    login_button: {
        padding: Spacing.xSmall,
        backgroundColor: Colors.Primary,
        marginVertical: Spacing.Small,
        borderRadius: 10,
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    redirect: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#000980',
        textAlign: 'center',
        fontSize: Sizes.Medium,
        textDecorationLine: 'underline'
    },
    continue_with: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.Primary,
        textAlign: 'center',
        fontSize: Sizes.xSmall,
    }
})
