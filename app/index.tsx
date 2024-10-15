import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/utils/colors";

const OnboardLogo = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 6000);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={require("../assets/images/Newstrack_animation_logo.gif")}
          resizeMode="cover"
          style={{ width: 450, height: 450, alignSelf: "center" }}
        />

        {loading && (
          <View>
            <Pressable
              style={{
                backgroundColor: Colors.lemon,
                padding: 20,
                borderRadius: 50,
                width: 200,
                alignSelf: "center",
              }}
              onPress={() => router.push("/signin")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
});

export default OnboardLogo;
