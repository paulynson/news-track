import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Colours } from "@/shared/Colours";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakingNews from "../components/BreakingNews";
import { useRouter } from "expo-router";

const index = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/sim.jpg")}
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: "100%",
            resizeMode: "cover",
            opacity: 0.85,
            // height: "auto",
          }}
        />
        <View
          style={{
            position: "absolute",
            paddingTop: insets.top,
            paddingHorizontal: 20,
          }}
        >
          <Pressable onPress={() => alert("Hi")}>
            <Ionicons name="menu" size={45} color={Colours.background} />
          </Pressable>
          <View style={{ marginTop: 90 }}>
            <Pressable
              onPress={() => alert("Hi")}
              style={{
                backgroundColor: "#f2f2f2",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                width: 180,
              }}
            >
              <Text style={{ fontSize: 18 }}>News of the day</Text>
            </Pressable>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 30,
                lineHeight: 30,
              }}
            >
              A glance to new technology ideas with the help of AI.
            </Text>
            <Pressable
              onPress={() => alert("Hi")}
              style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
            >
              <Text style={{ color: Colours.background, fontSize: 20 }}>
                Read more
              </Text>
              <Ionicons
                name="arrow-forward"
                size={25}
                color={Colours.background}
              />
            </Pressable>
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
        <Text style={{ color: Colours.text, fontSize: 24, fontWeight: "bold" }}>
          Breaking News{" "}
        </Text>
        <Pressable onPress={() => router.push("/search")}>
          <Text
            style={{ color: Colours.text, fontSize: 18, fontWeight: "bold" }}
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
  container: {},
  imageWrapper: {
    flex: 1,
  },
});
