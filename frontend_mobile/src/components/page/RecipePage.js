import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    setRecipe(res.data);
  }

  function requestRecipeDetailFail(err) {
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
    navigation.navigate("RecipeStep", { id: route.params.id, step: 1 });
  }

  return recipe.length === 0 ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <TopNav title={recipe[1]} />
      <View style={styles.content}>
        <View style={{ flex: 11, alignItems: "center" }}>
          <View style={{ flex: 3.5, alignItems: "center" }}>
            <View>
              <RecipeImage thumbnail={recipe[5]} difficulty={recipe[2]} amount={recipe[3]} time={recipe[4]} />
            </View>
          </View>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 9, alignItems: "center" }}>
            <RecipeIngredientPageBar checkRecipe={changeIndex} checkIngredient={changeIndex} index={index} />
            {index === 0 ? <IngredientList ingredients={recipe[6]} /> : <RecipeDetail recipe={recipe[7]} />}
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <Button color="white" variant="MainColor" size="medium" onPress={() => goToStep()}>
            <Text>요리 시작</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9f9",
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
    flex: 15,
    alignItems: "center",
  },
});
