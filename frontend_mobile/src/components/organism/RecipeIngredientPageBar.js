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
      <TouchableOpacity style={index === 0 ? styles.checked : styles.unchecked} onPress={() => checkIngredient(0)}>
        <Text style={styles.title}>재료</Text>
      </TouchableOpacity>

      <TouchableOpacity style={index === 1 ? styles.checked : styles.unchecked} onPress={() => checkRecipe(1)}>
        <Text style={styles.title}>레시피</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBarContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  checked: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDB954",
    height: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  unchecked: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BABABA",
    height: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})