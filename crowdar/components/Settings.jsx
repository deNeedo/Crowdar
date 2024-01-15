import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../supabaseClient';
import AuthContext from './AuthContext';

import { Styles } from '../styles/SettingsStyle';
import { Buttons } from '../styles/ButtonStyle';

export default function NotificationArea({navigation}) {

	const {session, setSession} = useContext(AuthContext)

    const signOut = async() => {
        await supabase.auth.signOut();
        setSession(null);
		navigation.navigate('Login');
    };

    return (
        <View>
            <Text style = {Styles.text_style}> Settings</Text>
            <TouchableOpacity style={Buttons.button} onPress={() => navigation.navigate('Account')}>
                <Text style = {Buttons.button_text}> Account Information </Text>
            </TouchableOpacity>
            <TouchableOpacity style={Buttons.button} onPress={signOut}>
                <Text style = {Buttons.button_text}> LOG OUT </Text>
            </TouchableOpacity>
        </View>
    )

}