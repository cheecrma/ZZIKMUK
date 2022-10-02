import React from "react";
import { StyleSheet, View, ImageBackground, Text, Button, TouchableOpacity } from "react-native";
import ExplainIcon from "../atom/ExplainIcon";
import { fetchRecipesPopular } from "../../apis/recipes";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
/*
name: 음식 이름
thumbnail: 음식 사진 url
difficulty: 어려움 정도, hard, normal, easy 중 선택
amount: 음식 양, 숫자
time: 조리 시간, 숫자
*/

export default function CarouselCard({ imageIndex }) {
  const [popular, setPopular] = React.useState([]);
  const navigation = useNavigation();

  function goRecipePage() {
    navigation.navigate("Recipe", { id: popular?.[imageIndex]?.[0] });
  }

  function requestPopularSuccess(res) {
    setPopular(res.data);
    // console.log(popular);
  }

  function requestPopularFail(err) {
    console.log(err);
    setPopular([]);
  }

  useEffect(() => {
    fetchRecipesPopular(requestPopularSuccess, requestPopularFail);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goRecipePage()} activeOpacity={0.8}>
        <ImageBackground
          style={styles.image}
          source={{ uri: popular?.[imageIndex]?.[5] }}
          imageStyle={{ borderRadius: 10 }}
          key={popular?.[imageIndex]?.[0]}
        >
          <View style={styles.contentBackground}>
            <View style={styles.contentText}>
              <Text style={styles.contentTitle}>{popular?.[imageIndex]?.[1]}</Text>
              <Text style={styles.contentSub}>현재 {popular?.[imageIndex]?.[6]}명의 유저 관심중</Text>
            </View>
            <View style={styles.icons}>
              <ExplainIcon type="difficulty" degree={popular?.[imageIndex]?.[2]} />
              <ExplainIcon type="amount" iconText={popular?.[imageIndex]?.[3]} />
              <ExplainIcon type="time" iconText={popular?.[imageIndex]?.[4]} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
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
  contentBackground: {
    backgroundColor: "rgba(255, 139, 52, 0.6)",
    width: "100%",
    height: "36%",
    justifyContent: "space-around",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentText: {
    marginLeft: 6,
  },
  contentTitle: {
    fontSize: 25,
    color: "white",
  },
  contentSub: {
    color: "white",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    width: 150,
    alignSelf: "flex-end",
  },
});
