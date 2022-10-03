import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Card from "../organism/Card";
import TopNav from "../organism/TopNav";
import { fetchRecommendRecipeList } from "../../apis/recipes";

export default function RecipeRecommendPage({ route, navigation }) {
  const [recommendList, setRecommendList] = useState([]);
  const scrollView = useRef();

  function requestRecommendRecipeListSuccess(res) {
    console.log(res.data);
    setRecommendList(res.data);
  }

  function requestRecommendRecipeListFail(err) {
    console.log(err);
    setRecommendList([]);
  }

  useEffect(() => {
    fetchRecommendRecipeList(
      route.params.newIngredient,
      requestRecommendRecipeListSuccess,
      requestRecommendRecipeListFail,
    );
  }, []);

  function goToRecipe(id) {
    navigation.push("Recipe", { id });
  }

  return (
    <View style={styles.container}>
      <TopNav title="추천 레시피" />
      <View style={styles.content}>
        <ScrollView ref={scrollView} showsVerticalScrollIndicator={false}>
          {recommendList.map((recipe, index) => (
            <Pressable onPress={() => goToRecipe(recipe[0])}>
              <Card
                name={recipe[1]}
                thumbnail={recipe[5]}
                difficulty={recipe[2]}
                amount={recipe[3]}
                time={recipe[4]}
                key={index}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Pressable onPress={() => scrollView.current.scrollTo({ y: 0 })}>
        <View style={styles.topBtn}>
          <AntDesign name="caretup" size={18} color="white" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 24,
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
