import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  const getLocation = async () => {
    await getPermissions();
    try {
      const location = await Location.getCurrentPositionAsync({});
      let newLocation = {
        id: 442,
        title: "Your Current Location",
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(newLocation);
      await AsyncStorage.setItem('location', JSON.stringify(newLocation));
    } catch (error) {
      setErrorMsg("Error getting location");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, errorMsg };
};

export default useLocation;
