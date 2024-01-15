import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import AuthContext from './AuthContext';
import { Sizes } from '../constants/Sizes';

export default function Location({route, navigation}) {
    const { height, width } = Dimensions.get("window");
    const { session, setSession } = useContext(AuthContext);
    const [ location, setLocation] = useState(null);
    const { friendName } = route.params;

	useEffect(() => {
		let intervalId = setInterval(getLocation, 10000)
		return () => clearInterval(intervalId);
	}, []);

    useEffect(() => {
        const checkSession = async () => {
            if (!session) {
                Alert.alert("User not logged in! Please login or register!");
                navigation.navigate('Home');
            }
        };
        checkSession();
    }, [session, navigation]);

    const getLocation = async () => {
        const {data} = await supabase.from('profiles').select('username').eq('id', session.user.id);
        if (data[0].username == null) {Alert.alert("Please specify username in user panel before using the location feature!");}
        else {
            const {data} = await supabase.from('profiles').select('location').eq('username', friendName);
            if (data[0].location == null) {setLocation(null);}
            else {setLocation(data[0].location);}
        }
    };
    return (
        <View resizeMode='contain'>
            {location ?
                <MapView style={{height: height, width: width}} showsUserLocation={true}>
                    <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}/>
                </MapView> : <Text style = {{color: '#ed09a9', textDecorationLine: 'underline', fontSize: Sizes.xxLarge}}> Friend is not sharing their location! </Text>
            }
        </View>
    );
};
