import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import RecipeImage from "../organism/RecipeImage";
import IngredientList from "../organism/IngredientDetail";
import RecipeIngredientPageBar from "../organism/RecipeIngredientPageBar";
import RecipeDetail from "../organism/RecipeDetail";
import Button from "../atom/Button";
import TopNav from "../organism/TopNav";

export default function RecipePage({ food }) {
  const [index, setIndex] = useState(0);

  function changeIndex(value) {
    setIndex(value);
  }

  return (
    <View style={styles.container}>
      <TopNav title="추천 레시피" />
      <View style={styles.content}>
        <RecipeImage thumbnail={food.thumbnail} difficulty={food.difficulty} amount={food.amount} time={food.time} />
        <RecipeIngredientPageBar checkRecipe={changeIndex} checkIngredient={changeIndex} index={index} />
        {index === 0 ? <IngredientList ingredients={food.ingredients} /> : <RecipeDetail recipe={food.recipe} />}
        <Button color="white" variant="MainColor" size="medium">
          <Text>요리 시작</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
