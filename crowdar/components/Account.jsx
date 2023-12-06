import { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AuthContext from './AuthContext';


export default function Account({ navigation}) {

    const { session, setSession } = useContext(AuthContext);    
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
    
    return (<View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={session?.user?.email} disabled/>
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)}/>
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)}/>
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title={loading ? 'Loading ...' : 'Update'} onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })} disabled={loading}/>
            </View>

            <View style={styles.verticallySpaced}>
                <Button title="Logout" onPress={async () => { await supabase.auth.signOut(); await signOut(); navigation.navigate('Login');}}/>
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
