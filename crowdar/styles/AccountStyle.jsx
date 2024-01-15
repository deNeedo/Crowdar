import { StyleSheet } from "react-native";
import {Colors} from '../constants/Colors';
import {Spacing} from '../constants/Spacing';

export const Styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    button: {
        padding: Spacing.xSmall,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    }
});