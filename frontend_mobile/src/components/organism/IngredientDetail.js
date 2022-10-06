import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

/*
IngredientList에서 ingredients: 재료 이름과 양을 담은 리스트
Ingredient에서 name: 재료 이름, amount: 재료 양
*/

// 재료 리스트
export default function IngredientList({ ingredients = [] }) {
  return (
    <View style={styles.ingredientList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ingredients.map((detail, index) => (
          <Ingredient key={index} name={detail[0]} amount={detail[1]} />
        ))}
      </ScrollView>
    </View>
  );
}

// 각 재료 이름, 양, 체크
function Ingredient({ name, amount }) {
  const [check, setCheck] = useState(false);
  function onPress() {
    setCheck(!check);
  }

  return (
    <Pressable style={styles.ingredient} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.rightBox}>
        <Text style={styles.amount}>{amount}</Text>
        <View style={styles.checkbox}>{check ? <Feather name="check" size={20} color="#FF8B34" /> : null}</View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ingredientList: {
    height: "55%",
    width: "85%",
    paddingVertical: 10,
  },
  ingredient: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    fontSize: 18,
  },
  rightBox: {
    flexDirection: "row",
  },
  amount: {
    fontSize: 18,
  },
  checkbox: {
    width: 25,
    height: 25,
    backgroundColor: "#FFE48E",
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
