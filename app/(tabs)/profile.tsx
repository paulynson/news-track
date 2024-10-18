import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/utils/colors";
import { auth } from "@/FirebaseConfig";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const ProfilePage = () => {
  const [users, setUsers] = useState<User | null>(null);
  const router = useRouter();

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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={Colors.gray} />
            <Text style={styles.infoText}>+123 456 7890</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={Colors.gray} />
            <Text style={styles.infoText}>New York, USA</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-open-outline" size={20} color={Colors.gray} />

            <Text style={styles.infoText}>{users?.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.gray}
            />
            <Text style={styles.infoText}>
              A short bio about John Doe goes here. It gives a brief
              introduction to who they are.
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={Colors.gray}
            />
            <Text style={styles.settingText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={Colors.gray}
            />
            <Text style={styles.settingText}>Privacy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="shield-outline" size={20} color={Colors.gray} />
            <Text style={styles.settingText}>Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={Colors.gray}
            />
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => auth.signOut()}
        >
          <Ionicons name="exit-outline" size={20} color={Colors.gray} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Define a neutral background color
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.lemon,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 5,
  },
  personalInfoSection: {
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.black,
  },
  settingsSection: {
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,

    borderBottomColor: Colors.gray,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.black,
  },
  logoutButton: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lemon,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 10,
    color: Colors.gray,
    fontWeight: "bold",
  },
});
