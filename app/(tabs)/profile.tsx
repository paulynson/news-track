import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "@/utils/colors";
import { router } from "expo-router";

const page = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: "100%",
            height: 300,
            backgroundColor: Colors.lemon,
            opacity: 0.85,
          }}
        ></View>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 500,
            position: "absolute",
            backgroundColor: Colors.gray,
            bottom: -50,
            left: "40%",
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            paddingTop: insets.top + 30,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.black, fontSize: 24, fontWeight: "bold" }}>
          Jade Thomson{" "}
        </Text>
        <Pressable onPress={() => router.push("/discover")}>
          <Text
            style={{ color: Colors.black, fontSize: 18, fontWeight: "bold" }}
          >
            logout
          </Text>
        </Pressable>
      </View>
      <View
        style={{ backgroundColor: Colors.white, height: "100%", padding: 20 }}
      >
        <Text> Post Number</Text>
      </View>
    </View>
  );
};

export default page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 40,
  },
  imageWrapper: {
    flex: 1,
  },
  // container: {
  //   // flex: 1,
  //   // justifyContent: "center",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginVertical: 40,
  // },
  // imageWrapper: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   backgroundColor: "gray",
  //   position: "absolute",
  //   bottom: 0,
  //   // left: "50%",
  //   // transform: [{ translateX: -50 }],
  // },
});
