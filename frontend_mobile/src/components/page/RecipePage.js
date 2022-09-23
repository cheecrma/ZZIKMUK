import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import RecipeImage from "../organism/RecipeImage";
import IngredientList from "../organism/IngredientDetail"
import RecipeIngredientPageBar from "../organism/RecipeIngredientPageBar";
import RecipeDetail from "../organism/RecipeDetail";
import Button from "../atom/Button";

export default function RecipePage({ food }) {
  const [index, setIndex] = useState(0)

  function changeIndex(value) {
    setIndex(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{food.name}</Text>
        <View></View>
      </View>
      <View style={styles.content}>
        <RecipeImage 
          thumbnail={food.thumbnail} 
          difficulty={food.difficulty}
          amount={food.amount}
          time={food.time}
        />
        <RecipeIngredientPageBar
          checkRecipe={changeIndex}
          checkIngredient={changeIndex}
          index={index}
        />
        {
          index === 0 ?
          <IngredientList ingredients={food.ingredients} /> :
          <RecipeDetail recipe={food.recipe} />
        }
        <Button
          children="요리 시작"
          color="white"
          variant="MainColor"
          size="medium" 
        />
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
