import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from "react-native";
import Button from "../atom/Button";
import { fetchRecipeComplete } from "../../apis/recipes";
import TopNav from "../organism/TopNav";

export default function CompletePage({ route, navigation }) {
  const [food, setFood] = useState([]);

  function requestRecipeCompleteSuccess(res) {
    console.log(res.data);
    setFood(res.data);
  }

  function requestRecipeCompleteFail(err) {
    console.log(err);
    setFood([]);
  }

  useEffect(() => {
    fetchRecipeComplete(route.params.id, requestRecipeCompleteSuccess, requestRecipeCompleteFail);
  }, []);

  function goToMain() {
    navigation.navigate("Main");
  }

  function goToPrevStpe() {
    navigation.push("RecipeStep", { id: route.params.id, step: route.params.totalSteps });
  }

  return (
    <View style={styles.container}>
      <TopNav title={food[0]} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: food[1] }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
        <Text style={styles.contentText}>완성!</Text>
        <Button onPress={() => goToPrevStpe()} variant="white" color="black" children="이전 단계" size="midium" />
        <Button onPress={() => goToMain()} variant="MainColor" color="white" children="메인으로" size="midium" />
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
