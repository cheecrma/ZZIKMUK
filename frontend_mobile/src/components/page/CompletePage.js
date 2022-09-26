import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RecipePagination from "../organism/RecipePagination";
import Button from "../atom/Button";

export default function ComplatePage({ food }) {
  const [step, setStep] = useState(0);

  function changeStep(index) {
    setStep(index);
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
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: food.thumbnail }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
        <Text style={styles.contentText}>완성!</Text>
        <Button variant="white" color="black" children="이전 단계" size="midium" />
        <Button variant="MainColor" color="white" children="메인으로" size="midium" />
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
    justifyContent: "space-evenly",
  },
  contentText: {
    fontSize: 26,
  },
  imageContainer: {
    width: 340,
    height: 200,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
    shadowColor: "black",
  },
  image: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
