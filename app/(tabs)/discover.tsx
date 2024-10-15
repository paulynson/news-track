import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MoreNews from "../components/MoreNews";
import { NewsProps } from "@/types/newsInterface";
import newsData from "@/data/newsdata.json";
import { Colors } from "@/utils/colors";
import { useDebounce } from "../hooks/useDebounce";

const index = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [allData, setAllData] = useState<any[]>([]);

  const searchFunc = () => {
    const searchContent = newsData.filter((search: NewsProps) =>
      search.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    <ActivityIndicator />;
    setAllData(searchContent);
  };

  useEffect(() => {
    searchFunc();
  }, [debouncedSearchText]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={
            {
              // position: "absolute",
              // paddingTop: insets.top,
              // paddingHorizontal: 20,
            }
          }
        >
          <View
            style={{
              marginTop: 50,
              borderWidth: 0,
              backgroundColor: Colors.white,
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Discovery</Text>
            <Text
              style={{
                color: Colors.gray,
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
                borderWidth: 0,
                borderRadius: 60,
                borderColor: Colors.gray,
                paddingHorizontal: 30,
                paddingVertical: 20,
                flexDirection: "row",
                backgroundColor: Colors.white,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Ionicons name="search" size={20} color={Colors.gray} />
              <TextInput
                style={{
                  marginLeft: 10,
                }}
                placeholder="Search..."
                value={searchText}
                onChangeText={(txt) => setSearchText(txt)}
                onTextInput={searchFunc}
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        <View
          style={{ paddingHorizontal: 20, marginBottom: 10, paddingBottom: 60 }}
        >
          <MoreNews
            searchText={searchText}
            setSearchText={setSearchText}
            dataSet={allData}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingBottom: 20,
    maxHeight: "100%",
  },
});
