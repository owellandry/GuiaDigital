import React from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SearchBar from './SearchBar';
import BottomNavBar from './BottomNavBar';
import { globalStyles } from '../styles';
import mapStyle from './MapStylesComponents';

export default function MapScreen() {
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (errorMsg) {
        return <View><Text>{errorMsg}</Text></View>;
    }

    if (!location) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={globalStyles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={globalStyles.map}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                customMapStyle={mapStyle}
            >
                {location && (
                    <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="Tu ubicación"
                >
                    <Image
                        source={require('../assets/custom-icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </Marker>
                )}
            </MapView>
            <SearchBar />
            <BottomNavBar />
        </View>
    );
}
