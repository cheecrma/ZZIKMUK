import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/*
레시피 추천, 상세 레시피, 단계별 레시피 화면에 들어갈 상단 바
title: 가운데 들어갈 화면 이름
*/

export default function TopNav({ title, page, stopSpeech }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (page === "recipeStep") {
            stopSpeech();
          }
          navigation.pop();
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{title}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          if (page === "recipeStep") {
            stopSpeech();
          }
          navigation.navigate("Main");
        }}
      >
        <Entypo name="home" size={24} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
