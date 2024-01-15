import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from '../supabaseClient';
import { Button, Input, colors } from 'react-native-elements';
import AuthContext from './AuthContext';
import GoogleAuth from './GoogleAuth';

import {Buttons} from '../styles/ButtonStyle';
import { Styles } from '../styles/loginScreenStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';


export default function Login({navigation}) {
    const {session, setSession} = useContext(AuthContext);

    useEffect(() => {
        const checkSession = async () => {
            if (session) {
                navigation.navigate('Home');
            }
        };
    
        checkSession();
    }, [session, navigation]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function signInWithEmail() {
        
        setLoading(true);
        const { error, session } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });


        if (error) {
            Alert.alert(error.message);  
        }
        else if (session) {
            setSession(session);
            navigation.navigate('Home');
        }
        setLoading(false);
    }

    return (
        <SafeAreaView>
            <View style={{padding: Spacing.xSmall}}>
                <View style={{alignItems : 'center'}}>
                    <Text style={[Styles.title,{fontSize: Sizes.xLarge}]}> Login Here </Text>
                    <Text style={[Styles.info_text, {fontSize: Sizes.Medium}]}> Welcome back! You've been missed! </Text>
                </View>
                <View style={{marginVertical: Spacing.Small}}>
                    <TextInput placeholder='Email' placeholderTextColor={Colors.Dark} onChangeText={(text) => setEmail(text)} value={email} style={Styles.text_input}/>
                    <TextInput placeholder='Password' placeholderTextColor={Colors.Dark} secureTextEntry onChangeText={(text) => setPassword(text)} value={password} style={Styles.text_input}/>
                </View>
                <View>
                    <Text style={Styles.forgot_pass}>Forgot password? Reset here! </Text>
                </View>
                <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()} style = {Styles.login_button}>
                    <Text style={Buttons.button_text}> Log In </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')} style = {{padding: Spacing.xSmall}}>
                    <Text style={Styles.redirect}> Create new account </Text>
                </TouchableOpacity>
                <View style={{marginVertical: Spacing.xSmall}}>
                    <Text style={Styles.continue_with}> Or continue with </Text>
                    <View style={{alignItems: 'center', marginVertical: Spacing.Small}}>
                        <GoogleAuth/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
)}
