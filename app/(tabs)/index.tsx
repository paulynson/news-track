import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BreakingNews from "../components/BreakingNews";
import { useRouter } from "expo-router";
import { auth } from "@/FirebaseConfig";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Colors } from "@/utils/colors";

const index = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={Colors.lemon} />
      <View>
        <View
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: "100%",
            height: 400,
            backgroundColor: Colors.lemon,
            opacity: 0.85,
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
          <View style={{ marginTop: 90 }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 10,
                lineHeight: 30,
              }}
            >
              Get the Latest Updates on NASA.
            </Text>
            <View
              style={{
                backgroundColor: Colors.black,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                width: 180,
              }}
            >
              <Text style={{ fontSize: 18, color: Colors.lemon }}>
                NASA and Space
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.black, fontSize: 24, fontWeight: "bold" }}>
          Breaking News{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/discover")}>
          <Text
            style={{
              color: Colors.black,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            More
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
        <BreakingNews />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 40,
    height: "100%",
    minHeight: "100%",
  },
  imageWrapper: {
    flex: 1,
  },
});
