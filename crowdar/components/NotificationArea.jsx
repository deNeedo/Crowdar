import { View, Text } from 'react-native';
import { Styles } from '../styles/NotificationAreaStyle';

export default function NotificationArea({navigation}) {

    return (
        <View style={Styles.background}>
            <Text style = {Styles.text_style}> Notifications </Text>
        </View>
    )

}