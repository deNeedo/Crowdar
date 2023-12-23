import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../supabaseClient';
import AuthContext from './AuthContext';

import { Styles } from '../styles/welcomeScreenStyle';

export default function NotificationArea({navigation}) {

	const {session, setSession} = useContext(AuthContext)

    const signOut = async() => {
        await supabase.auth.signOut();
        setSession(null);
		navigation.navigate('Login');
    };

    return (
        <View>
            <Text> Settings Panel </Text>
            <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('Account')}>
                <Text> Account Information </Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button} onPress={signOut}>
                <Text> LOG OUT </Text>
            </TouchableOpacity>
        </View>
    )

}