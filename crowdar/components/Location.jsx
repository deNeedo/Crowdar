import React, {useState, useEffect, useContext} from 'react';
import { supabase } from '../supabaseClient';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Button, PermissionsAndroid, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AuthContext from './AuthContext';

export default function Location() {
    // state to hold location
    const { session, setSession } = useContext(AuthContext);
    const [location, setLocation] = useState(null);
    // function to check permissions and get Location
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
        console.log('res is:', res);
        if (res) {
            Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
        }
        });
    };
    return (
        <View /*style={styles.container}*/   style={{marginTop: 50, height: height / 2.5}} resizeMode='contain'>
            <Text>Welcome!</Text>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%'}}>
                <Button title="Get Location" onPress={getLocation} />
            </View>
            <Text> Latitude: {location ? location.coords.latitude : null} </Text>
            <Text> Longitude: {location ? location.coords.longitude : null} </Text>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%'}}>
                {location ? <MapView style={{height: height/2, width: width}} showsUserLocation={true} /> : <Text> Not sharing location! </Text>}
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
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Geolocation');
        return true;
        } else {
        console.log('You cannot use Geolocation');
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