import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
	Screen: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#222222'
    }, Button: {
		backgroundColor: '#dddddd',
		borderRadius: 5,
		padding: 10
    }, TextError: {
		color: '#dd0000',
		marginTop: 100,
		fontSize: 20
    }, TextSuccess: {
		color: '#00dd00',
		marginTop: 100,
		fontSize: 20
    }, TextInput: {
		color: '#dddddd',
		marginBottom: 20,
		fontSize: 20
    }, TextList: {
		color: '#dddddd'
	}, List: {
		marginTop: '20%'
	}
});
