import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Chat, Location } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import TopTab from "./TopTab";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 12,
  height: 55,
  position: "absolute",
  bottom: 30,
  left: 20,
  right: 20,
};

const BottomTabNavigation = () => {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={TopTab}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
