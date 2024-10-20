import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/utils/colors";

const OnboardLogo = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/signin");
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={require("../assets/images/Newstrack_animation_logo.gif")}
          resizeMode="cover"
          style={{ width: 450, height: 450, alignSelf: "center" }}
        />

        {loading && <ActivityIndicator size="large" color={Colors.lemon} />}
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
