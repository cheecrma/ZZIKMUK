import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

/*
RecipeDetail에서 recipe: 레시피 스텝을 담은 배열
RecipeStep에서 number: 스텝 번호, detail: 각 스텝에 해당하는 조리법
*/

// 레시피 리스트
export default function RecipeDetail({ recipe = [] }) {
  return (
    <View style={styles.recipe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {recipe.map((detail, index) => (
          <RecipeStep key={index} number={index + 1} detail={detail} />
        ))}
      </ScrollView>
    </View>
  );
}

// 레시피 한 스텝
function RecipeStep({ number, detail }) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepNum}>{number}</Text>
      <Text style={styles.stepDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recipe: {
    height: "75%",
    width: "85%",
    paddingVertical: 10,
  },
  step: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 12,
  },
  stepNum: {
    fontSize: 20,
  },
  stepDetail: {
    fontSize: 16,
    marginLeft: 8,
    marginTop: 4,
  },
});
