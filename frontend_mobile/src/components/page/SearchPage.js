import React, { useState, useRef, useEffect } from "react";
import Input from "../atom/input";
import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Card from "../organism/Card";
import axios from "axios";
import { searchRecipesByName, searchRecipesByIngredient } from "../../apis/recipes";

export default function SearchPage({ navigation }) {
  const [foodList, setFoodList] = useState([]);
  const [tag, setTag] = useState(0);
  const scrollView = useRef();
  const [searchText, setSearchText] = useState("");
  const [sortTheme, setSortTheme] = useState("");

  function goToRecipe(id) {
    navigation.push("Recipe", { id });
  }

  function searchByNameSuccess(res) {
    console.log(res.data);
    setFoodList(res.data);
  }

  function searchByNameFail(err) {
    console.log(err);
  }

  function searchByIngredientSuccess(res) {
    console.log(res.data);
    setFoodList(res.data);
  }

  function searchByIngredientFail(err) {
    console.log(err);
  }

  function search() {
    if (tag === 0) {
      searchRecipesByIngredient(searchText, searchByIngredientSuccess, searchByIngredientFail);
    } else {
      searchRecipesByName(searchText, searchByNameSuccess, searchByNameFail);
    }
    setSortTheme("조회");
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (searchText) {
      console.log(searchText);
      console.log(tag);
      search();
      scrollView.current.scrollTo({ y: 0 });
    }
  }, [tag]);

  // 시간순 추가, 재료 많은 순, 가나다순 삭제
  function sort(theme) {
    let newFoodList = [...foodList];
    if (theme === "조회") {
      newFoodList.sort((foodA, foodB) => foodB[6] - foodA[6]);
    } else if (theme === "시간") {
      newFoodList.sort((foodA, foodB) => foodA[5] - foodB[5]);
    } else if (theme === "높음") {
      newFoodList.sort((foodA, foodB) => foodB[3] - foodA[3]);
    } else if (theme === "낮음") {
      newFoodList.sort((foodA, foodB) => foodA[3] - foodB[3]);
    } else if (theme === "적음") {
      newFoodList.sort((foodA, foodB) => foodA[7] - foodB[7]);
    }
    if (Array.isArray(foodList)) {
      setFoodList(newFoodList);
    }
    setSortTheme(theme);
    scrollView.current.scrollTo({ y: 0 });
  }

  return (
    <View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setSearchText("");
                  setTag(0);
                  navigation.navigate("Main");
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ width: 300, backgroundColor: "white", borderRadius: 5, flex: 8 }}>
              <Input onChangeText={text => setSearchText(text)} />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Pressable onPress={() => search()}>
                <AntDesign name="search1" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tagContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            setTag(0);
          }}
        >
          <View
            style={
              tag === 0
                ? { ...styles.tagTitle, backgroundColor: "#FFE48E" }
                : { ...styles.tagTitle, backgroundColor: "#fff" }
            }
          >
            <Text style={styles.tagTitleText}>재료로 검색</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setTag(1);
          }}
        >
          <View
            style={
              tag === 1
                ? { ...styles.tagTitle, backgroundColor: "#FFE48E" }
                : { ...styles.tagTitle, backgroundColor: "#fff" }
            }
          >
            <Text style={styles.tagTitleText}>이름으로 검색</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.sortBar}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Pressable
            style={sortTheme === "조회" ? { ...styles.checkedBtn, ...styles.sortBtn } : { ...styles.sortBtn }}
            onPress={() => sort("조회")}
          >
            <Text style={sortTheme === "조회" ? styles.checkedText : {}}>조회순</Text>
          </Pressable>
          <Pressable
            style={sortTheme === "시간" ? { ...styles.checkedBtn, ...styles.sortBtn } : { ...styles.sortBtn }}
            onPress={() => sort("시간")}
          >
            <Text style={sortTheme === "시간" ? styles.checkedText : {}}>조리 시간순</Text>
          </Pressable>
          <Pressable
            style={sortTheme === "높음" ? { ...styles.checkedBtn, ...styles.sortBtn } : { ...styles.sortBtn }}
            onPress={() => sort("높음")}
          >
            <Text style={sortTheme === "높음" ? styles.checkedText : {}}>난이도 높은순</Text>
          </Pressable>
          <Pressable
            style={sortTheme === "낮음" ? { ...styles.checkedBtn, ...styles.sortBtn } : { ...styles.sortBtn }}
            onPress={() => sort("낮음")}
          >
            <Text style={sortTheme === "낮음" ? styles.checkedText : {}}>난이도 낮은순</Text>
          </Pressable>
          <Pressable
            style={sortTheme === "적음" ? { ...styles.checkedBtn, ...styles.sortBtn } : { ...styles.sortBtn }}
            onPress={() => sort("적음")}
          >
            <Text style={sortTheme === "적음" ? styles.checkedText : {}}>재료 적은순</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <ScrollView ref={scrollView} showsVerticalScrollIndicator={false}>
            {Array.isArray(foodList) ? (
              foodList.map((recipe, index) => (
                <Pressable key={index} onPress={() => goToRecipe(recipe[0])}>
                  <Card
                    name={recipe[1]}
                    thumbnail={recipe[2]}
                    difficulty={recipe[3]}
                    amount={recipe[4]}
                    time={recipe[5]}
                    key={index}
                  />
                </Pressable>
              ))
            ) : (
              <Text>{foodList}</Text>
            )}
          </ScrollView>
        </View>
        {Array.isArray(foodList) && foodList.length > 2 ? (
          <Pressable onPress={() => scrollView.current.scrollTo({ y: 0 })}>
            <View style={styles.topBtn}>
              <AntDesign name="caretup" size={18} color="white" />
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 34,
    marginBottom: 10,
  },
  tagTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: "100%",
    borderRadius: 8,
  },
  tagTitleText: {
    fontSize: 18,
  },
  container: {
    backgroundColor: "#FFE48E",
    padding: 5,
    margin: 5,
    borderRadius: 10,
    height: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  contentContainer: {
    height: "75%",
  },
  content: {
    height: "100%",
    alignItems: "center",
  },
  topBtn: {
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "#ADADAD",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  sortBar: {
    flexDirection: "row",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
  sortBtn: {
    padding: 6,
    borderWidth: 0.6,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  checkedBtn: {
    backgroundColor: "#FF8B34",
  },
  checkedText: {
    color: "white",
  },
});
