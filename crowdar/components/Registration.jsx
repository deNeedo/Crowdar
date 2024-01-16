import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from '../supabaseClient';
import { Button, Input, colors } from 'react-native-elements';
import AuthContext from './AuthContext';
import GoogleAuth from './GoogleAuth';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Buttons} from '../styles/ButtonStyle';
import { Styles } from '../styles/registrationScreenStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

export default function Login({navigation}) {
    const { session, setSession } = useContext(AuthContext);
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


    //Checking email correctness
    const [checkValidEmail, SetValidEmail] = useState(false);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleCheckEmail = (text) => {
        const isValidEmail = emailRegex.test(text);
        SetValidEmail(!isValidEmail);
        setEmail(text);
    };

    //Check password cottrctness
    const [passwordError, setPasswordError] = useState("");

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 8;
    
        return {
            isValid: hasUpperCase && hasLowerCase && hasNumber && isLongEnough,
            message: 
                !hasUpperCase ? "Password must contain an uppercase letter" :
                !hasLowerCase ? "Password must contain a lowercase letter" :
                !hasNumber ? "Password must contain a number" :
                !isLongEnough ? "Password must be at least 8 characters long" : ""
        };
    };

    //Checking if password and confirm password are the same
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateConfirmPassword = (confirmPwd) => {
        if (confirmPwd !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError('');
        }
        setConfirmPassword(confirmPwd);
    };

    //Password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    
    async function signUpWithEmail() {
        setLoading(true);
        const { data: { session }, error, } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error)
            Alert.alert(error.message);
        else if (!session) {
            Alert.alert('Please check your inbox for email verification!');
            navigation.navigate('Login');
        }
        setLoading(false);
    }
    
    return (
        <SafeAreaView style={Styles.background}>
            <View style = {{padding: Spacing.xSmall}}>
                <View style = {{alignItems : 'center'}}>
                    <Text style = {{ 
                        fontSize: Sizes.xLarge,
                        color: Colors.Primary,
                        fontFamily: 'Poppins_600SemiBold',
                        marginVertical: Spacing.xSmall,
                    }}>
                        Create Account
                    </Text>
                    
                    <Text style = {{ 
                        fontSize: Sizes.Medium,
                        color: Colors.Dark,
                        textAlign: 'center',
                        maxWidth: '90%',
                        fontFamily: 'Poppins_600SemiBold',
                    }}>
                        Create account so You can find your friends faster!
                    </Text>
                </View>

                    <View style = {{ 
                        marginVertical: Spacing.Small,
                    }}>
                        <Input placeholder='Email' 
                                placeholderTextColor={Colors.Dark}  
                                onChangeText={handleCheckEmail} 
                                value={email} 
                                inputContainerStyle={{
                                    borderBottomWidth: 0,
                                }}
                                style = {{ 
                                    fontSize: Sizes.Medium,
                                    color: Colors.Dark,
                                    fontFamily: 'Poppins_400Regular',
                                    padding: '3%',
                                    backgroundColor: Colors.Gray,
                                    borderRadius: 10,
                                    marginVertical: Spacing.xxSmall,
                                }}/>
                            {checkValidEmail && (
                                <Text style ={{
                                    fontFamily: 'Poppins_600SemiBold',
                                    color: Colors.Error,
                                    textAlign: 'right',
                                    fontSize: Sizes.xSmall,
                                    marginTop: -25,
                                }}>
                                    Invalid Email
                                </Text>
                )}
                        
                        <Input
                            placeholder='Password'
                            secureTextEntry={!passwordVisibility}
                            rightIcon={{ 
                                type: 'font-awesome', 
                                name: passwordVisibility ? 'eye-slash' : 'eye',
                                onPress: () => setPasswordVisibility(!passwordVisibility),
                                color: Colors.Primary,
                                size: 20, 
                            }}
                            onChangeText={(text) => {
                                setPassword(text);
                                const validationResult = validatePassword(text);
                                setPasswordError(validationResult.message);
                            }}
                            value={password}
                            rightIconContainerStyle={{
                                paddingLeft: 10,
                            }}
                            inputContainerStyle={{
                                borderBottomWidth: 0,
                            }}
                            style = {{ 
                                fontSize: Sizes.Medium,
                                color: Colors.Dark,
                                fontFamily: 'Poppins_400Regular',
                                padding: '3%',
                                backgroundColor: Colors.Gray,
                                borderRadius: 10,
                                marginVertical: Spacing.xxSmall,
                        }}/>
                            {passwordError !== "" && (
                            <Text style ={{
                                fontFamily: 'Poppins_600SemiBold',
                                color: Colors.Error,
                                textAlign: 'right',
                                fontSize: Sizes.xSmall,
                                marginTop: -25,
                            }}>
                                {passwordError}
                            </Text>
                        )}

                        <Input
                            placeholder='Confirm Password'
                            secureTextEntry={!confirmPasswordVisibility}
                            rightIcon={{ 
                                type: 'font-awesome', 
                                name: confirmPasswordVisibility ? 'eye-slash' : 'eye',
                                onPress: () => setConfirmPasswordVisibility(!confirmPasswordVisibility),
                                color: Colors.Primary,
                                size: 20, 
                            }}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                validateConfirmPassword(text);
                            }}
                            value={confirmPassword}
                            rightIconContainerStyle={{
                                paddingLeft: 10,
                            }}
                            inputContainerStyle={{
                                borderBottomWidth: 0,
                            }}
                            style = {{ 
                                fontSize: Sizes.Medium,
                                color: Colors.Dark,
                                fontFamily: 'Poppins_400Regular',
                                padding: '3%',
                                backgroundColor: Colors.Gray,
                                borderRadius: 10,
                                marginVertical: Spacing.xxSmall,
                            }}/> 
                                {confirmPasswordError !== "" && (
                                    <Text style={{
                                    fontFamily: 'Poppins_600SemiBold',
                                    color: Colors.Error,
                                    textAlign: 'right',
                                    fontSize: Sizes.xSmall,
                                    marginTop: -25,
                                    }}>
                                        {confirmPasswordError}
                                    </Text>
                            )}
                        
                    </View>

                    <TouchableOpacity disabled={loading || checkValidEmail || passwordError !== "" || confirmPasswordError !== ""}  onPress={signUpWithEmail} style = {[Styles.button,{
                        padding: Spacing.xSmall,
                        backgroundColor: Colors.Primary,
                        marginVertical: Spacing.Small,
                        shadowColor: Colors.Primary,
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                    }]}>
                        <Text style ={Buttons.button_text}> Register </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {{padding: Spacing.xSmall}}>
                        <Text style ={Styles.redirect}> Already have an account </Text>
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
);}
