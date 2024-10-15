import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import newsData from "@/data/newsdata.json";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/utils/colors";

const newsDetails = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // const NewDetails = newsData.find((item) => item.id === id);

  const newsId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);

  const newsDetails = newsData.find((item) => item.id === newsId);

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-circle"
                size={45}
                color={Colors.white}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: newsDetails?.image }}
              style={{
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                width: "100%",
                height: 600,
                resizeMode: "cover",
                opacity: 0.85,
              }}
            />
            <View
              style={{
                position: "absolute",
                paddingHorizontal: 20,
                justifyContent: "space-between",
                bottom: 40,
              }}
            >
              <View style={{ marginTop: 50 }}>
                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    width: 160,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {newsDetails?.categories}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginVertical: 30,
                    lineHeight: 40,
                  }}
                >
                  {newsDetails?.title}
                </Text>
                <Text
                  style={{
                    color: "#f3f3f3",
                    fontSize: 15,
                    fontStyle: "italic",
                    lineHeight: 20,
                    textShadowColor: "red",
                  }}
                >
                  {newsDetails?.summary}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ padding: 20 }}>
            <Text style={{ lineHeight: 30, fontSize: 18 }}>
              {newsDetails?.description.split(". ").filter(Boolean) || []}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default newsDetails;

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    flex: 1,
  },
});
