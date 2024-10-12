import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MoreNews from "../components/MoreNews";
import { NewsProps } from "@/types/newsInterface";
import newsData from "@/data/newsdata.json";

const index = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [allData, setAllData] = useState<any[]>([]);

  const searchFunc = () => {
    const searchContent = newsData.filter((search: NewsProps) =>
      search.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setAllData(searchContent);
  };

  useEffect(() => {
    searchFunc();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={
            {
              // position: "absolute",
              // paddingTop: insets.top,
              // paddingHorizontal: 20,
            }
          }
        >
          <Pressable onPress={() => alert("Hi")}>
            <Ionicons name="menu" size={45} color="black" />
          </Pressable>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Discovery</Text>
            <Text
              style={{
                color: "#777777",
                fontSize: 15,
                marginVertical: 5,
                lineHeight: 30,
              }}
            >
              News from all over the world
            </Text>
            <View
              style={{
                marginVertical: 20,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Search..."
                style={{}}
                value={searchText}
                onChangeText={(txt) => setSearchText(txt)}
                // onKeyPress={() => searchFunc}
                onTextInput={searchFunc}
              />
              <Pressable onPress={searchFunc}>
                <Ionicons name="search" size={26} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
        <MoreNews
          searchText={searchText}
          setSearchText={setSearchText}
          dataSet={allData}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imageWrapper: {
    flex: 1,
  },
});
