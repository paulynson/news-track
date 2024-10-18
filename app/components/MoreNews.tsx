import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/utils/colors";

interface NewsProps {
  id: string | string[];
  title: string;
  summary: string;
  image_url: string;
  categories: string;
}

interface SearchProps {
  dataSet: NewsProps[];
  selectedCat: string;
}

const MoreNews = ({ dataSet }: SearchProps) => {
  const router = useRouter();

  const renderNews = ({ item }: { item: NewsProps }) => {
    const id = Array.isArray(item.id) ? item.id[0] : item.id;

    return (
      <Pressable
        style={styles.newsItem}
        onPress={() =>
          router.push({
            pathname: "/newsdetails/[id]",
            params: { id: id.toString(), category: item.categories },
          })
        }
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.newsImage}
          resizeMode="cover"
        />
        <View style={styles.newsDetails}>
          <Text style={styles.newsTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={styles.newsSummary}>
            {item.summary}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSet}
        keyExtractor={(item) => (Array.isArray(item.id) ? item.id[0] : item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={renderNews}
        alwaysBounceVertical={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        initialNumToRender={15}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MoreNews;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 20,
    backgroundColor: Colors.white,
  },
  newsItem: {
    padding: 10,
    marginBottom: 10, // Adds spacing between items
    flexDirection: "row",
    alignItems: "center",
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  newsDetails: {
    marginLeft: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  newsSummary: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
    color: Colors.gray,
  },
});
