import React, { useState, useEffect, useContext, TouchableOpacity } from 'react';
import { supabase } from '../supabaseClient';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, View, Text, Button, PermissionsAndroid, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AuthContext from './AuthContext';

export default function Location({route, navigation}) {
    
    // chcecking if the session exists
    const { session, setSession } = useContext(AuthContext);
    const [ location, setLocation] = useState(null);
    const { userId } = route.params;

    useEffect(() => {console.log(location)}, [location]);

    useEffect(() => {
        const checkSession = async () => {
            if (!session) {
                Alert.alert("User not logged in! Please login or register!");
                navigation.navigate('Home');
            }
        };
        checkSession();
    }, [session, navigation]);

    // signout
    const signOut = async () => {
        await supabase.auth.signOut();

        setSession(null);
        navigation.navigate('Login');
    };
    
    // state to hold location
    // const [location, setLocation] = useState(false);
    // function to check permissions and get Location
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
        if (res) {
            Geolocation.getCurrentPosition(
                async (position) => {
                    // console.log(position)
                    const {data} = await supabase.from('profiles').select('location').eq('id', userId);
                    if (data[0].location == null) {setLocation(null);}
                    else {setLocation(data[0].location);}
                    await supabase.from('profiles').update({location: position.coords}).eq('id', session.user.id);
                },
                (error) => {setLocation(null);},
                {enableHighAccuracy: true, timeout: 30000}
            );
        }
        });
    };
    return (
        <View /*style={styles.container}*/ style={{marginTop: 50, height: height / 2.5}} resizeMode='contain'>
            <Text>Welcome!</Text>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%'}}>
                <Button title="Get Location" onPress={getLocation} />
            </View>
            <Text> Latitude: {location ? location.latitude : null} </Text>
            <Text> Longitude: {location ? location.longitude : null} </Text>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%'}}>
                {location ?
                    <MapView style={{height: height / 2, width: width}} showsUserLocation={true}>
                        <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}/>
                    </MapView> : <Text> Friend is not sharing their location! </Text>
                }
            </View>
            <View>
                <Button title="Log Out" onPress={signOut}> </Button>
            </View>
        </View>
    );
};
const { height, width } = Dimensions.get("window");
const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
        );
       
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});