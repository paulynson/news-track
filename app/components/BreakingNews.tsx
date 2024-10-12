import { Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import newsData from "@/data/newsdata.json";

import { useRouter } from "expo-router"; // Changed 'router' to 'useRouter'
import { NewsProps } from "@/types/newsInterface";

const BreakingNews = () => {
  const router = useRouter();

  const renderNews = ({ item }: { item: NewsProps }) => {
    return (
      <Pressable
        style={{ padding: 10, width: 300, marginRight: 20 }}
        onPress={() => router.push(`/newsdetails/${item.id}` as any)}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 280, height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
        <Text />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "normal",
            lineHeight: 20,
            marginBottom: 10,
          }}
        >
          {item.summary}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {item.categories}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderNews}
      />
    </>
  );
};

export default BreakingNews;
