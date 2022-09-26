import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Card from "../organism/Card";
import TopNav from "../organism/TopNav";

export default function RecipeRecommendPage({ recommendList }) {
  return (
    <View style={styles.container}>
      <TopNav title="추천 레시피" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recommendList.map((recipe, index) => (
            <Card
              name={recipe.name}
              thumbnail={recipe.thumbnail}
              difficulty={recipe.difficulty}
              amount={recipe.amount}
              time={recipe.time}
              key={index}
            />
          ))}
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
  content: {
    flex: 24,
    alignItems: "center",
  },
});
