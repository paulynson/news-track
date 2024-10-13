import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.push("/");
    } catch (error: any) {
      Alert.alert("Error", "Invalid email or password", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Sign Up</Text>

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
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: "blue",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 30,
            justifyContent: "center",
          }}
        >
          <Text>Already Register?</Text>
          <Pressable onPress={() => router.push("/")}>
            <Text style={{ marginLeft: 10, color: "blue" }}>Login</Text>
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default SignupScreen;
