import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/utils/colors";
import { useAppSelector } from "../redux/store";

interface ArticlesProps {
  image_url: string;
  summary: string;
  title: string;
}

const newsDetails = () => {
  const { id, category } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const parsedId = Array.isArray(id) ? id[0] : id;

  const singleArticle = useAppSelector((state) => state.news.allArticles);
  const singleBlog = useAppSelector((state) => state.news.allBlogs);
  const singleReport = useAppSelector((state) => state.news.allReports);

  let CData: ArticlesProps[] = [
    ...singleArticle,
    ...singleBlog,
    ...singleReport,
  ];

  const finder = CData?.find((item: any) => item?.id === parseInt(parsedId));

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{
                shadowColor: Colors.lemon,
                borderColor: Colors.lemon,
                borderWidth: 2,
                borderRadius: 50,
                backgroundColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                marginTop: insets.top + 10,
                width: 50,
                height: 50,
              }}
            >
              <Ionicons
                name="arrow-back-circle"
                size={45}
                color={Colors.lemon}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar animated={true} backgroundColor={Colors.lemon} />
          <View>
            <Image
              source={{ uri: finder?.image_url }}
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
                paddingHorizontal: 20,
                justifyContent: "space-between",
                bottom: 40,
              }}
            >
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 30,
                    fontWeight: "bold",
                    marginVertical: 30,
                    lineHeight: 40,
                  }}
                >
                  {finder?.title}
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontStyle: "italic",
                    lineHeight: 30,
                    textShadowColor: "red",
                  }}
                >
                  {finder?.summary}
                </Text>
                <Text>{id}</Text>
                <Text>{category}</Text>
              </View>
            </View>
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
