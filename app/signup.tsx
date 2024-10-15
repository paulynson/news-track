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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "@/utils/colors";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (user) router.push("/signin");
      console.log(user);
      setLoading(false);
    } catch (error: any) {
      Alert.alert("Error", "Invalid email or password", error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ marginBottom: 40 }}>
          <Image
            source={require("../assets/images/reg.png")}
            style={{ width: "100%", resizeMode: "cover" }}
          />
        </View>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subTitle}>Please register to Login.</Text>
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
            onPress={signUp}
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
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color={Colors.black} />
              ) : null}{" "}
              Sign Up
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
          <Text style={{ color: Colors.gray }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/")}>
            <Text
              style={{
                marginLeft: 10,
                color: Colors.black,
                fontWeight: "bold",
              }}
            >
              Login
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

export default SignupScreen;
