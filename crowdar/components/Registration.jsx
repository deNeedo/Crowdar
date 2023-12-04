import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from '../supabaseClient';
import { Button, Input, colors } from 'react-native-elements';
import AuthContext from './AuthContext';
import GoogleAuth from './GoogleAuth';

import { styles } from '../styles/registrationScreenStyle';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { Spacing } from '../constants/Spacing';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

export default function Login({navigation}) {
    const { session, setSession } = useContext(AuthContext);

    useEffect(() => {
        const checkSession = async () => {
            if (session) {
                navigation.navigate('Location');
            }
        };
    
        checkSession();
    }, [session, navigation]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function signUpWithEmail() {
        setLoading(true);
        const { data: { session }, error, } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error)
            Alert.alert(error.message);
        else if (!session) {
            await Alert.alert('Please check your inbox for email verification!');
            navigation.navigate('Login');
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

                        <TextInput placeholder='Confirm password' placeholderTextColor={Colors.Dark}  secureTextEntry style = {{ 
                            fontSize: Sizes.Medium,
                            color: Colors.Dark,
                            fontFamily: 'Poppins_400Regular',
                            padding: '3%',
                            backgroundColor: Colors.Gray,
                            borderRadius: 10,
                            marginVertical: Spacing.xSmall,
                        }}/>
                    </View>

                    <TouchableOpacity disabled={loading} onPress={() => signUpWithEmail()} style = {{
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

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {{
                        padding: Spacing.xSmall,
                    }}>
                        <Text style ={{
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.Dark,
                            textAlign: 'center',
                            fontSize: Sizes.Medium,
                        }}>
                            Already have an account
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
        
        
        // <View style={styles.container}>
        //     <View style={[styles.verticallySpaced, styles.mt20]}>
        //         <Input label="Email" leftIcon={{ type: 'font-awesome', name: 'envelope' }} onChangeText={(text) => setEmail(text)} value={email} placeholder="email@address.com" autoCapitalize={'none'}/>
        //     </View>
        //     <View style={styles.verticallySpaced}>
        //         <Input label="Password" leftIcon={{ type: 'font-awesome', name: 'lock' }} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder="Password" autoCapitalize={'none'}/>
        //     </View>
        //     <View style={styles.verticallySpaced}>
        //         <Button title="Register" disabled={loading} onPress={() => signUpWithEmail()}/>
        //     </View>
        // </View>);
);}

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 40,
//         padding: 12,
//     },
//     verticallySpaced: {
//         paddingTop: 4,
//         paddingBottom: 4,
//         alignSelf: 'stretch',
//     },
//     mt20: {
//         marginTop: 20,
//     },
// });
