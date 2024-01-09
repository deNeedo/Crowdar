import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from '../supabaseClient';
import { Button, Input, colors } from 'react-native-elements';
import AuthContext from './AuthContext';
import GoogleAuth from './GoogleAuth';

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
            <View style = {{ 
                padding: Spacing.xSmall,
            }}>
                <View style = {{ 
                    alignItems : 'center',
                }}>
                    <Text style = {{ 
                        fontSize: Sizes.xLarge,
                        color: Colors.Primary,
                        fontFamily: 'Poppins_600SemiBold',
                        marginVertical: Spacing.xSmall,
                    }}>
                        Login Here
                    </Text>
                    
                    <Text style = {{ 
                        fontSize: Sizes.Medium,
                        color: Colors.Dark,
                        textAlign: 'center',
                        maxWidth: '90%',
                        fontFamily: 'Poppins_600SemiBold',
                    }}>
                        Welcome back! You've been missed!
                    </Text>
                </View>

                    <View style = {{ 
                        marginVertical: Spacing.Small,
                    }}>
                        <TextInput placeholder='Email' placeholderTextColor={Colors.Dark}  onChangeText={(text) => setEmail(text)} value={email} style = {{ 
                            fontSize: Sizes.Medium,
                            color: Colors.Dark,
                            fontFamily: 'Poppins_400Regular',
                            padding: '3%',
                            backgroundColor: Colors.Gray,
                            borderRadius: 10,
                            marginVertical: Spacing.xSmall,
                        }}/>
                        
                        <TextInput placeholder='Password' placeholderTextColor={Colors.Dark}  secureTextEntry onChangeText={(text) => setPassword(text)} value={password} style = {{ 
                            fontSize: Sizes.Medium,
                            color: Colors.Dark,
                            fontFamily: 'Poppins_400Regular',
                            padding: '3%',
                            backgroundColor: Colors.Gray,
                            borderRadius: 10,
                            marginVertical: Spacing.xSmall,
                        }}/>
                    </View>

                    <View>
                        <Text style = {{
                            fontFamily: 'Poppins_600SemiBold',
                            fontSize: Sizes.Small,
                            color: Colors.Dark,
                            alignSelf: 'flex-end'
                        }}>

                            Forgot password? Reset here!
                        </Text>
                    </View>

                    <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()} style = {{
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

                    }}>
                        <Text style ={{
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.White,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
                        }}>
                            Log In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Registration')} style = {{
                        padding: Spacing.xSmall,
                    }}>
                        <Text style ={{
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.Dark,
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
                        }}>
                            Crate new account
                        </Text>
                    </TouchableOpacity>

                    <View style = {{
                        marginVertical: Spacing.xSmall,
                    }}>
                    <Text style ={{
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.Primary,
                            textAlign: 'center',
                            fontSize: Sizes.xSmall,
                        }}>
                            Or continue with
                        </Text>

                        <View style = {{
                            alignItems: 'center',
                            marginVertical: Spacing.Small,
                        }}>
                            <GoogleAuth/>
                        </View>
                    </View>
            </View>
        </SafeAreaView>
)}
