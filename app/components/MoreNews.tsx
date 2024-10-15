import {
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import categories from "@/data/categories.json";

import { useRouter } from "expo-router";
import { NewsProps } from "@/types/newsInterface";
import { Colors } from "@/utils/colors";

interface searchProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  dataSet: any[];
}

const MoreNews = ({ searchText, setSearchText, dataSet }: searchProps) => {
  const router = useRouter();

  const [selectedCat, setSelectedCat] = useState<string>("All");

  const filterCat = (categories: string) => {
    setSelectedCat(categories);
    setSearchText(searchText);
  };

  const filteredData =
    selectedCat == "All" || selectedCat == ""
      ? dataSet
      : dataSet.filter((cat) => cat.categories === selectedCat);

  const renderNews = ({ item }: { item: NewsProps }) => {
    return (
      <Pressable
        style={{
          padding: 10,
          width: 300,
          marginRight: 20,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => router.push(`/newsdetails/${item.id}` as any)}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
          resizeMode="cover"
        />

        <View style={{ marginLeft: 20 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 15,
              fontWeight: "normal",
              lineHeight: 20,
              marginBottom: 10,
              color: Colors.gray,
            }}
          >
            {item.summary}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        marginVertical: 20,
        backgroundColor: Colors.white,
        maxHeight: "100%",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={
              selectedCat === cat.categories ? styles.activeCat : styles.cat
            }
            onPress={() => filterCat(cat.categories)}
          >
            <Text
              style={
                selectedCat === cat.categories
                  ? styles.activeText
                  : styles.idleText
              }
            >
              {cat.categories}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderNews}
        alwaysBounceVertical={true}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default MoreNews;

const styles = StyleSheet.create({
  cat: {
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  activeCat: {
    backgroundColor: Colors.lemon,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  activeText: {
    color: Colors.black,
    fontWeight: "bold",
  },
  idleText: {
    color: Colors.gray,
  },
});
