import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MoreNews from "../components/MoreNews";
import { Colors } from "@/utils/colors";
import { useDebounce } from "../hooks/useDebounce";
import categories from "@/data/categories.json";
import useAxios from "../hooks/useAxios";
import {
  storeArticles,
  storeBlogs,
  storeReports,
} from "../redux/features/articles";
import { ArticlesProps } from "@/types";
import { useAppDispatch } from "../redux/store";

const Index = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [selectedCat, setSelectedCat] = useState<string>("articles");
  const [allData, setAllData] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  const {
    data: news,
    loading,
    error,
  } = useAxios(`https://api.spaceflightnewsapi.net/v4/${selectedCat}`);

  const filterCat = (category: string) => {
    setSelectedCat(category);
    setSearchText("");
  };

  if (selectedCat === "blogs") {
    dispatch(storeBlogs(news?.results as ArticlesProps[]));
  } else if (selectedCat === "reports") {
    dispatch(storeReports(news?.results as ArticlesProps[]));
  } else {
    dispatch(storeArticles(news?.results as ArticlesProps[]));
  }

  useEffect(() => {
    if (news?.results) {
      const searchContent = news.results.filter((item: any) =>
        item.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
      setAllData(searchContent);
    }
  }, [debouncedSearchText, news]);

  const filteredData = searchText.length > 0 ? allData : news?.results || [];

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Discovery</Text>
          <Text style={styles.subtitle}>News from all over the world</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.categoryContainer}>
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
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.lemon} />
          </View>
        ) : (
          <MoreNews dataSet={filteredData} selectedCat={selectedCat} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingBottom: 20,
    height: "100%",
  },
  loadingContainer: {
    marginVertical: 40,
  },
  header: {
    marginTop: 50,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 15,
    marginVertical: 5,
    lineHeight: 30,
  },
  searchContainer: {
    marginVertical: 20,
    borderRadius: 60,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  categoryContainer: {
    marginVertical: 30,
  },
  cat: {
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  activeCat: {
    backgroundColor: Colors.lemon,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  activeText: {
    color: Colors.black,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  idleText: {
    color: Colors.gray,
    textTransform: "capitalize",
  },
});
