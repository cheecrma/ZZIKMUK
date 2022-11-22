import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import ExplainIcon from "../atom/ExplainIcon";

/*
thumbnail: 사진 url
difficulty: 어려움 정도, hard, normal, easy 중 선택
amount: 음식 양
time: 조리 시간
*/

export default function RecipeImage({ thumbnail, difficulty, amount, time }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: thumbnail }} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.icons}>
          <ExplainIcon type="difficulty" degree={difficulty} />
          <ExplainIcon type="amount" iconText={amount} />
          <ExplainIcon type="time" iconText={time} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 220,
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
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    width: 150,
  },
});
