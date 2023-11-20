import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from '../Styles';
import sha256 from 'sha256';

export const RegistrationScreen = ({navigation}) => {
    const salt = 'CR0WD4R.4PP';
	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

	const registerTry = async () => {
        let status = true;
        if (login == '' || pass == '') {alert('You need to provide required registration data!')}
        else {
            let {data, error} = await supabase.from('users').select('username');
            if (error) {console.error('Fetch error: ', error);}
            else {
                for (let elem of data) {
                    if (elem.username == login) {alert('Account already exists!'); status = false; break;}
                }
            }
            if (status) {
                let secure_pass = sha256(salt + login + pass);
                let {error} = await supabase.from('users').insert({full_name: name, username: login, password: secure_pass})
                if (error) {console.error('Fetch error: ', error);}
                else {alert('Successfully registered!')}
            }
        }   
	}

	return (
		<View style={Styles.Screen}>
            <TextInput style={Styles.Input} placeholder='Full Name' placeholderTextColor='#dddddd' onChangeText={setName} value={name} />
			<TextInput style={Styles.Input} placeholder='Login' placeholderTextColor='#dddddd' onChangeText={setLogin} value={login} />
			<TextInput style={Styles.Input} placeholder='Password' placeholderTextColor='#dddddd' onChangeText={setPass} value={pass} secureTextEntry = {true} />
			<TouchableOpacity onPress={registerTry}>
                <Text style={Styles.Button}> REGISTER </Text>
            </TouchableOpacity>
		</View>
	);
}
