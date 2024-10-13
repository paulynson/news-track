import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colours } from "@/shared/Colours";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colours.primary,
        tabBarInactiveTintColor: "#777",
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: Colours.background,
          borderTopWidth: 0,
          padding: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="navigate-circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
