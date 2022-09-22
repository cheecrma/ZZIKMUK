import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


/*
checkRecipe: 재료를 확인할 때 실행되는 함수
checkIngredient: 레시피를 확인할 때 실행되는 함수
index: 0 -> 재료, 1 -> 레시피
*/

// 재료, 레시피 확인 페이지 바
export default function RecipeIngredientPageBar({ 
  checkRecipe = () => {}, 
  checkIngredient = () => {}, 
  index 
}) {

  return (
    <View style={styles.pageBarContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={{alignSelf: "center", padding: 3}} onPress={checkIngredient}>
          <Text style={styles.title}>재료</Text>
        </TouchableOpacity>
        <View style={ index === 0 ? styles.checked : styles.unchecked }></View>
      </View>

      <View style={styles.titleContainer}>
        <TouchableOpacity style={{alignSelf: "center", padding: 3}} onPress={checkRecipe}>
          <Text style={styles.title}>레시피</Text>
        </TouchableOpacity>
        <View style={ index === 1 ? styles.checked : styles.unchecked }></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBarContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    width: "50%",
  },
  title: {
    fontSize: 18
  },
  checked: {
    width: "100%",
    backgroundColor: "#FDB954",
    height: 3,
    borderRadius: 3,
  },
  unchecked: {
    width: "100%",
    backgroundColor: "#A1A1A1",
    height: 3,
    borderRadius: 5,
  },
})