import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from "react-native";
import Button from "../atom/Button";
import { fetchRecipeComplete } from "../../apis/recipes";
import TopNav from "../organism/TopNav";
import Loading from "../atom/Loading";

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

  return food.length === 0 ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      {/* <TopNav title={food[0]} /> */}
      <View style={styles.logoBoxText}>
        <Text style={styles.logoText} onPress={() => navigation.navigate("Main")}>
          ZZIKMUK
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>🎉 수고하셨습니다 🎉</Text>
        <View style={styles.imageBox}>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.image}
              source={{ uri: food[1] }}
              imageStyle={{ borderRadius: 10 }}
            ></ImageBackground>
          </View>
        </View>
        <View style={styles.contentView}>{/* <Text style={styles.contentTextInformation}>{food[0]}</Text> */}</View>
        <View style={styles.buttonStyle}>
          <Button onPress={() => goToPrevStpe()} variant="white" color="black" children="이전 단계" size="mediumer" />
          <Button onPress={() => goToMain()} variant="MainColor" color="white" children="메인으로" size="mediumer" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoBoxText: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    height: 60,
    justifyContent: "center",
    elevation: 5,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FDB954",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  contentView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  contentTextInformation: {
    fontSize: 26,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontSize: 26,
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imageBox: {
    flex: 5,
  },
  imageContainer: {
    width: 340,
    height: 340,
    borderRadius: 10,
    elevation: 10,
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
