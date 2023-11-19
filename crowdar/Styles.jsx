import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
	Screen: {
		backgroundColor: '#ffffff'
    }, Button: {
		elevation: 8,
		backgroundColor: "#009688",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		margin: 10
    }, TextError: {
		color: '#dd0000',
		marginTop: 100,
		fontSize: 20
    }, TextSuccess: {
		color: '#00dd00',
		marginTop: 100,
		fontSize: 20
    }, Input: {
		color: '#ffffff',
		height: 60,
		width: 300,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	}, TextList: {
		color: '#dddddd'
	}, List: {
		marginTop: '20%'
	}
});
