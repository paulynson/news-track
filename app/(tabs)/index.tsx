import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakingNews from "../components/BreakingNews";
import { useRouter } from "expo-router";
import { auth } from "@/FirebaseConfig";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Colors } from "@/utils/colors";

const index = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUsers(user);
    });

    return unsubscribe;
  }, []);

  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      router.push("/signin");
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: "100%",
            height: 500,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => auth.signOut()}>
              <Ionicons name="log-out-outline" size={35} color={Colors.black} />
            </Pressable>
            <Text style={{ color: Colors.black }}>Hi, {users?.email}</Text>
          </View>
          <View style={{ marginTop: 90 }}>
            <Pressable
              onPress={() => alert("Hi")}
              style={{
                backgroundColor: Colors.black,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                width: 180,
              }}
            >
              <Text style={{ fontSize: 18, color: Colors.lemon }}>
                News of the day
              </Text>
            </Pressable>
            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 30,
                lineHeight: 30,
              }}
            >
              A glance to new technology ideas with the help of AI.
            </Text>
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
        <Pressable onPress={() => router.push("/discover")}>
          <Text
            style={{ color: Colors.black, fontSize: 18, fontWeight: "bold" }}
          >
            More
          </Text>
        </Pressable>
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
  },
  imageWrapper: {
    flex: 1,
  },
});
