import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import RecipeImage from "../organism/RecipeImage";
import IngredientList from "../organism/IngredientDetail";
import RecipeIngredientPageBar from "../organism/RecipeIngredientPageBar";
import RecipeDetail from "../organism/RecipeDetail";
import Button from "../atom/Button";
import TopNav from "../organism/TopNav";
import { fetchRecipeDetail } from "../../apis/recipes";
import Loading from "../atom/Loading";

export default function RecipePage({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const [recipe, setRecipe] = useState([]);

  function requestRecipeDetailSuccess(res) {
    console.log(res.data);
    setRecipe(res.data);
  }

  function requestRecipeDetailFail(err) {
    console.log(err);
    setRecipe([]);
  }

  useEffect(() => {
    fetchRecipeDetail(route.params.id, requestRecipeDetailSuccess, requestRecipeDetailFail);
  }, []);

  /* 재료창, 레시피창 바꾸는 함수
      0이면 재료, 1이면 레시피
  */
  function changeIndex(value) {
    setIndex(value);
  }

  // 단계별 레시피 페이지로 가는 함수
  function goToStep() {
    navigation.push("RecipeStep", { id: route.params.id, step: 1 });
  }

  return recipe.length === 0 ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <TopNav title={recipe[1]} />
      <View style={styles.content}>
        <RecipeImage thumbnail={recipe[5]} difficulty={recipe[2]} amount={recipe[3]} time={recipe[4]} />
        <RecipeIngredientPageBar checkRecipe={changeIndex} checkIngredient={changeIndex} index={index} />
        {index === 0 ? <IngredientList ingredients={recipe[6]} /> : <RecipeDetail recipe={recipe[7]} />}
        <Button color="white" variant="MainColor" size="medium" onPress={() => goToStep()}>
          <Text>요리 시작</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  content: {
    flex: 18,
    alignItems: "center",
  },
});
