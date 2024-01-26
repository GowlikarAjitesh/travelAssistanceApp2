
import { useFonts } from 'expo-font';
import * as Splashscreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding,Search, CountryDetails, AllReviews, AddReviews, Recommended, PlaceDetails, HotelDetails, HotelList, HotelSearch, SelectRoom, Payments, Settings, SelectedRoom, Successful, Failed, PopularDestinations, PaymentMethod, PopularHotels } from './screens';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import AuthTopTab from './navigation/AuthTopTab';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCard from './screens/setttings/AddCard';




const Stack = createNativeStackNavigator();

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(true);

  const appFirstLaunch = async () => {
    const onboarding = await AsyncStorage.getItem('first')
    if(onboarding !== null){
      setFirstLaunch(false)
    }else{
      setFirstLaunch(true)
    }
}

useEffect(() => {
  appFirstLaunch();
}, [])
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/regular.otf'),
    medium: require('./assets/fonts/medium.otf'),
    bold: require('./assets/fonts/bold.otf'),
    light: require('./assets/fonts/light.otf'),
    xtrabold: require('./assets/fonts/xtrabold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
      <StatusBar  />
      <Stack.Navigator>
        {firstLaunch && (
          <Stack.Screen name='Onboard' component={Onboarding} options={{ headerShown: false }} />
        )}
        
        <Stack.Screen name='Bottom' component={BottomTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
        <Stack.Screen name='CountryDetails' component={CountryDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Recommended' component={Recommended} options={{ headerShown: false }} />
        <Stack.Screen name='AddReviews' component={AddReviews} options={{ headerShown: false }} />
        <Stack.Screen name='AllReviews' component={AllReviews} options={{ headerShown: false }} />
        <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{ headerShown: false }} />
        <Stack.Screen name='HotelDetails' component={HotelDetails} options={{ headerShown: false }} />
        <Stack.Screen name='HotelList' component={HotelList} options={{ headerShown: false }} />
        <Stack.Screen name='HotelSearch' component={HotelSearch} options={{ headerShown: false }} />
        <Stack.Screen name='SelectRoom' component={SelectRoom} options={{ headerShown: false }} />
        <Stack.Screen name='PlacesByCountry' component={PopularDestinations} options={{ headerShown: false }} />
        <Stack.Screen name='Payments' component={PaymentMethod} options={{ headerShown: false }} />
        <Stack.Screen name='Success' component={Successful} options={{ headerShown: false }} />
        <Stack.Screen name='AuthTop' component={AuthTopTab} options={{ headerShown: false }} />
        <Stack.Screen name='Fail' component={Failed} options={{ headerShown: false }} />
        <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name='SelectedRoom' component={SelectedRoom} options={{ headerShown: false }} />
        <Stack.Screen name='AddCard' component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name='PopularHotels' component={PopularHotels} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
