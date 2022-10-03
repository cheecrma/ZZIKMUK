import React, { useState, useRef, useEffect } from "react";
import Input from "../atom/input";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Card from "../organism/Card";
import axios from "axios";

export default function SearchPage({ navigation }) {
  const [foodList, setFoodList] = useState([]);
  const [tag, setTag] = useState(0);
  const scrollView = useRef();
  const [searchText, setSearchText] = useState("");

  function goToRecipe(id) {
    navigation.push("Recipe", { id });
  }

  function search() {
    console.log("검색");
    if (tag === 0) {
      axios
        .post(`https://j7a102.p.ssafy.io/api/recipes/search/r_ingr/`, {
          text: searchText,
        })
        .then(res => {
          console.log(res.data);
          setFoodList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`https://j7a102.p.ssafy.io/api/recipes/search/r_name/`, {
          text: searchText,
        })
        .then(res => {
          console.log(res.data);
          setFoodList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <View>
      <View style={styles.tagContainer}>
        <TouchableWithoutFeedback onPress={() => setTag(0)}>
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
        <TouchableWithoutFeedback onPress={() => setTag(1)}>
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => {
              setSearchText("");
              setTag(0);
              navigation.navigate("Main");
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableWithoutFeedback>
          <View style={{ width: 300, backgroundColor: "white", borderRadius: 5 }}>
            <Input onChangeText={text => setSearchText(text)} />
          </View>
          <Pressable onPress={() => search()}>
            <AntDesign name="search1" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      {/* <View>정렬</View> */}
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
        {foodList.length > 2 ? (
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
    marginTop: 8,
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
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  contentContainer: {
    height: "80%",
  },
  content: {
    height: "100%",
    alignItems: "center",
  },
  topBtn: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#ADADAD",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});
