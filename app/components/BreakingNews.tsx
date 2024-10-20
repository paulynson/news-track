import {
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";

import { useRouter } from "expo-router";
import useAxios from "../hooks/useAxios";
import { Colors } from "@/utils/colors";
import { useAppDispatch } from "../redux/store";
import { storeArticles } from "../redux/features/articles";
import { ArticlesProps } from "@/types";

const BreakingNews = () => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const dispatch = useAppDispatch();

  const {
    data: news,
    loading,
    error,
  } = useAxios("https://api.spaceflightnewsapi.net/v4/articles");

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.lemon} />;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  interface NewsProps {
    id: number;
    title: string;
    summary: string;
    image_url: string;
    categories: string;
  }

  if (!loading && !error && news?.results) {
    dispatch(storeArticles(news?.results as ArticlesProps[]));
  }

  const renderNews = ({ item }: { item: NewsProps }) => {
    return (
      <Pressable
        style={{ padding: 10, width: 300, marginRight: 20 }}
        onPress={() => router.push(`/newsdetails/${item.id}` as any)}
      >
        <Image
          source={{
            uri: imageError
              ? "https://via.placeholder.com/200x150?text=No+Image"
              : item.image_url,
          }}
          style={{ width: 280, height: 200, borderRadius: 10 }}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        <Text />
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "normal",
            lineHeight: 20,
            marginBottom: 10,
          }}
          numberOfLines={4}
        >
          {item.summary}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={news?.results}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderNews}
        initialNumToRender={15}
      />
    </>
  );
};

export default BreakingNews;
