import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Colors } from "@/utils/colors";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.push("/(tabs)");
      setLoading(false);
    } catch (error: any) {
      Alert.alert("Error: ", error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar animated={true} backgroundColor={Colors.lemon} />
        <View style={{ marginBottom: 40 }}>
          <Image
            source={require("../assets/images/spec.png")}
            style={{ width: "100%", resizeMode: "cover" }}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>Please sign in to continue.</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Pressable
            onPress={signIn}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 50,
              backgroundColor: Colors.lemon,
            }}
          >
            <Text
              style={{
                color: Colors.black,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color={Colors.black} />
              ) : null}{" "}
              Sign in
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 30,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors.gray }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text
              style={{
                marginLeft: 10,
                color: Colors.black,
                fontWeight: "bold",
              }}
            >
              Signup
            </Text>
          </Pressable>
        </View>
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
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 30,
    textAlign: "left",
    fontWeight: "normal",
  },
  input: {
    borderColor: Colors.light,
    borderWidth: 0,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: Colors.light,
  },
});

export default LoginScreen;
