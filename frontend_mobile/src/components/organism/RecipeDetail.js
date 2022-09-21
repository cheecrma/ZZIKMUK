import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";


/*
*/

function RecipeStep({ number, detail }) {

  return (
    <View style={styles.step}>
      <Text style={styles.stepNum}>{number}</Text>
      <Text style={styles.stepDetail}>{detail}</Text>
    </View>
  )
}

export default function RecipeDetail({ recipe=[] }) {

  return (
    <View style={styles.recipe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          recipe.map((detail, index) => (
            <RecipeStep number={index + 1} detail={detail} />
          ))
        }
      </ScrollView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  recipe: {
    height: 280,
  },
  step: {
    flexDirection: "row",
    width: "80%",
    marginBottom: 12,
  },
  stepNum: {
    fontSize: 20,
  },
  stepDetail: {
    fontSize: 16,
    marginLeft: 8,
    marginTop: 4,
  }
})