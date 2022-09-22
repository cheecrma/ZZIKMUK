import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Card from "../organism/Card"

export default function RecipeRecommendPage({ recommendList }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>추천 레시피</Text>
        <View></View>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            recommendList.map((recipe, index) => (
              <Card 
                name={recipe.name} 
                thumbnail={recipe.thumbnail} 
                difficulty={recipe.difficulty}
                amount={recipe.amount}
                time={recipe.time}
                key={index}
              />
            ))
          }
        </ScrollView>
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
    flex: 24,
    alignItems: "center",
  },
});
