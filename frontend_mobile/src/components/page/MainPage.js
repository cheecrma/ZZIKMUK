import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CarouselOrganism from "../organism/CarouselOrganism";
import { fetchRecipesTips } from "../../apis/recipes";
import axios from "axios";

export default function MainPage({ navigation }) {
  /// 랜덤 꿀팁 추천 /////
  const [tip, setTip] = React.useState([]);
  const randomTip = Math.floor(Math.random() * 5 + 1);

  function requestTipSuccess(res) {
    // console.log(res.data);
    setTip(res.data);
  }

  function requestTipFail(err) {
    console.log(err);
    setTip([]);
  }

  useEffect(() => {
    fetchRecipesTips(randomTip, requestTipSuccess, requestTipFail);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoBoxText}>
        <Text style={styles.logoText} onPress={() => navigation.navigate("Main")}>
          ZZIKMUK
        </Text>
      </View>
      <Text style={styles.popularText}>
        🔥 오늘 인기 있는 <Text style={styles.RecipeText}>레시피</Text> 🔥
      </Text>
      <View style={styles.carousel}>
        <CarouselOrganism />
      </View>
      <Text style={styles.tipText}>🍯 요리 꿀팁 🍯</Text>
      <View style={styles.tipRandom}>
        <Text style={styles.tipContent}>{tip}</Text>
      </View>
      <View style={styles.empty}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoBoxText: {
    backgroundColor: "#FFFFFF",
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
  popularText: {
    marginTop: 30,
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  carousel: {
    flex: 10,
  },

  RecipeText: {
    color: "#FF8B34",
  },
  tipText: {
    flex: 1,
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
  },
  tipRandom: {
    flex: 2,
    marginTop: 10,
    width: 330,
    height: 80,
  },
  tipContent: {
    fontSize: 16,
    backgroundColor: "#FFE48E",
    borderRadius: 10,
    elevation: 2,
  },
  empty: {
    flex: 1,
  },
});
