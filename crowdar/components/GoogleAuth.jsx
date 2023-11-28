import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { supabase } from '../supabaseClient';

export default function() {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '730477403456-c8sff048tu40pt0t4ssfokkjsu8a37pe.apps.googleusercontent.com', 
    });

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();
                    console.log(JSON.stringify(userInfo, null, 2))
                    if (userInfo.idToken) {
                        const { data, error } = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken
                        });
                        console.log(error, data);
                    } else {throw new Error('No ID token present!')}
                } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
            }}
        />
    );
}