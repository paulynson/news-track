import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/utils/colors";
import { View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.lemon,
        tabBarInactiveTintColor: Colors.gray,

        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: Colors.light,
          borderTopWidth: 0,
          paddingVertical: 5,
          height: 80,
          borderRadius: 50,
          margin: 20,
          elevation: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="navigate-circle" size={30} color={`${color}`} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person"
              size={30}
              color={`${color} , ${Colors.light}`}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
