import { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { Alert, StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AuthContext from './AuthContext';
import { Buttons } from '../styles/ButtonStyle';
import { Styles } from '../styles/AccountStyle';


export default function Account({ navigation}) {

    const {session, setSession} = useContext(AuthContext);    
    const [user, setUser] = useState(null);


    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    //Google SignOut
    signOut = async () => {
        try {
        await GoogleSignin.signOut();
        setUser(null);
        } catch (error) {
        console.error(error);
        }
    };
    
    useEffect(() => {
        if (session)
            getProfile();
    }, [session]);
    
    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user)
                throw new Error('No user on the session!');
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    }
    
    async function updateProfile({ username, website, avatar_url, }) {
        try {
            setLoading(true);
            if (!session?.user)
                throw new Error('No user on the session!');
            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };
            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) {
                throw error;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    }
    
    return (<View style={Styles.container}>
            <View style={[Styles.verticallySpaced, Styles.mt20]}>
                <Input label="Email" value={session?.user?.email} disabled/>
            </View>
            <View style={Styles.verticallySpaced}>
                <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)}/>
            </View>
            <View style={Styles.verticallySpaced}>
                <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)}/>
            </View>

            <View style={[Styles.verticallySpaced, Styles.mt20]}>
                <TouchableOpacity onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })} disabled={loading} style={Styles.button}>
                    <Text style = {Buttons.button_text}>{loading ? 'Loading ...' : 'Update'}</Text>
                </TouchableOpacity>
            </View>

            <View style={Styles.verticallySpaced}>
                <TouchableOpacity onPress={async () => { await supabase.auth.signOut(); await signOut(); navigation.navigate('Login');}} style = {Styles.button}>
                    <Text style = {Buttons.button_text}>Logout</Text>    
                </TouchableOpacity>
            </View>
        </View>);
}