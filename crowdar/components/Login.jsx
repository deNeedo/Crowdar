import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../supabaseClient';
import { Button, Input } from 'react-native-elements';
import AuthContext from './AuthContext';


export default function Login({navigation}) {
    const { session, setSession } = useContext(AuthContext);


    //Need to fix that

    async function x() {
        if (session) {
            //await Alert.prompt('Already logged in!');
            navigation.navigate('Account');}
    }
    
    useEffect(() => {
        x();
    }, [])

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
            navigation.navigate('Welcome');  
        }
        else if (session) {
            setSession(session);
            navigation.navigate('Account');
        }
        setLoading(false);
    }
    
    return (<View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" leftIcon={{ type: 'font-awesome', name: 'envelope' }} onChangeText={(text) => setEmail(text)} value={email} placeholder="email@address.com" autoCapitalize={'none'}/>
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Password" leftIcon={{ type: 'font-awesome', name: 'lock' }} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder="Password" autoCapitalize={'none'}/>
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Login" disabled={loading} onPress={() => signInWithEmail()}/>
            </View>
        </View>);
}
const styles = StyleSheet.create({
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
});
