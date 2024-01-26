import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, ActivityIndicator, TextInput, Text, InputAccessoryView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import useLocation from '../../hook/useLocation';
import { useNavigation } from '@react-navigation/native';

const MIN_LATITUDE_DELTA = 0.0001;
const MIN_LONGITUDE_DELTA = 0.0001;
const MAX_LATITUDE_DELTA = 50.0;
const MAX_LONGITUDE_DELTA = 50.0;

const Location = () => {
  const { location, errorMsg } = useLocation();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const handleZoomIn = () => {
    if (mapRef.current && mapRef.current.__lastRegion && location) {
      const newLatitudeDelta = mapRef.current.__lastRegion.latitudeDelta / 1.5;
      const newLongitudeDelta = mapRef.current.__lastRegion.longitudeDelta / 1.5;

      if (newLatitudeDelta > MIN_LATITUDE_DELTA && newLongitudeDelta > MIN_LONGITUDE_DELTA) {
        const newRegion = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        };

        mapRef.current.animateToRegion(newRegion);
      }
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && mapRef.current.__lastRegion) {
      const newLatitudeDelta = mapRef.current.__lastRegion.latitudeDelta * 1.5;
      const newLongitudeDelta = mapRef.current.__lastRegion.longitudeDelta * 1.5;

      if (newLatitudeDelta < MAX_LATITUDE_DELTA && newLongitudeDelta < MAX_LONGITUDE_DELTA) {
        const newRegion = {
          latitude: mapRef.current.__lastRegion.latitude,
          longitude: mapRef.current.__lastRegion.longitude,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        };

        mapRef.current.animateToRegion(newRegion);
      }
    }
  };

  const handleResetLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handlePickupChange = (text) => {
    setPickupLocation(text);
  };

  const handleDestinationChange = (text) => {
    setDestinationLocation(text);
  };

  const handlePickupSuggestions = () => {
    // Implement logic to fetch and display suggestions based on pickupLocation
  };

  const handleDestinationSuggestions = () => {
    // Implement logic to fetch and display suggestions based on destinationLocation
  };

  const coordinates = {
    latitude: location ? location.latitude : 0,
    longitude: location ? location.longitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: 'My Location',
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const searchBarContainerStyle = {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'column',
  };
  const buttonContainerStyle = {
    bottom: 100,
    right: 20,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} initialRegion={coordinates} style={styles.mapStyle}>
        {location && <Marker coordinate={coordinates} title={coordinates.title} />}
      </MapView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EB6A58" />
        </View>
      )}
      <View style={buttonContainerStyle}>
        <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
          <FontAwesome name="minus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetLocation}>
          <FontAwesome name="location-arrow" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={searchBarContainerStyle}>
        <View style={styles.inputBar}>
        <TouchableOpacity style={styles.icon} onPress={handlePickupChange}>
          <FontAwesome name="square" size={10} color="black" />
        </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Pickup Location"
            value={pickupLocation}
            onChangeText={handlePickupChange}
            onFocus={handlePickupSuggestions}
            inputAccessoryViewID="pickupInputAccessory"
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.inputBar}>
        <TouchableOpacity style={styles.icon} onPress={handlePickupChange}>
          <FontAwesome name="map-marker" size={20} color="black" />
        </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Destination Location"
            value={destinationLocation}
            onChangeText={handleDestinationChange}
            onFocus={handleDestinationSuggestions}
            inputAccessoryViewID="destinationInputAccessory"
            placeholderTextColor="black"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  button: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderLeftColor: 'grey',
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  icon: {
    color: '#FF4433',
    backgroundColor: 'white',
    padding: 5,
  },
  inputBar: {
    top:20,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'white',
    color: 'orange',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default Location;
