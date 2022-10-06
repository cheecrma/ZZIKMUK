import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Button from "../atom/Button";
import { fetchRecipeComplete } from "../../apis/recipes";
import Loading from "../atom/Loading";

export default function CompletePage({ route, navigation }) {
  const [food, setFood] = useState([]);

  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  function requestRecipeCompleteSuccess(res) {
    setFood(res.data);
  }

  function requestRecipeCompleteFail(err) {
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
      <View style={styles.logoBoxText}>
        <Text style={styles.logoText} onPress={() => navigation.navigate("Main")}>
          ZZIKMUK
        </Text>
      </View>
      <ImageBackground style={{ ...styles.content }} source={{ uri: food[1] }} blurRadius={15}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.contentText}></Text>
          <View style={styles.imageBox}>
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.image} source={{ uri: food[1] }} imageStyle={{ borderRadius: 10 }}>
                <View style={{ flex: 7 }}></View>
                <View style={{ flex: 1, alignSelf: "flex-end", marginRight: 10, marginBottom: 10 }}>
                  <Image
                    source={require("../../../static/LogoBlack.png")}
                    resizeMode="contain"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={{ ...styles.contentView, alignSelf: "flex-end", marginRight: 40 }}>
            <Text style={{ color: "white", fontSize: 14, alignSelf: "flex-end" }}>
              {time.year}-{time.month > 9 ? time.month : "0" + String(time.month)}-
              {time.date > 9 ? time.date : "0" + String(time.date)}
            </Text>
            <Text style={{ color: "white", fontSize: 28, alignSelf: "flex-end" }}>{food[0]}</Text>
            <Text style={{ color: "white", fontSize: 18, alignSelf: "flex-end" }}>완성했습니다!</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: 3 }}>
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
    backgroundColor: "#fff",
  },
  logoBoxText: {
    flex: 1,
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
    flex: 11,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    backgroundColor: "#fff9f9",
  },
  contentView: {
    flex: 3,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imageBox: {
    flex: 6,
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
