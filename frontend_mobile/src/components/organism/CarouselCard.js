import React from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import ExplainIcon from "../atom/ExplainIcon";

/*
name: 음식 이름
thumbnail: 음식 사진 url
difficulty: 어려움 정도, hard, normal, easy 중 선택
amount: 음식 양, 숫자
time: 조리 시간, 숫자
*/

export default function CarouselCard({
  name,
  thumbnail,
  difficulty,
  amount,
  time,
  views,
}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: thumbnail }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.contentBackground}>
          <View style={styles.contentText}>
            <Text style={styles.contentTitle}>{name}</Text>
            <Text style={styles.contentSub}>현재 {views}명의 유저 관심중</Text>
          </View>
          <View style={styles.icons}>
            <ExplainIcon type="difficulty" degree={difficulty} />
            <ExplainIcon type="amount" iconText={amount} />
            <ExplainIcon type="time" iconText={time} />
          </View>
        </View>
      </ImageBackground>
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
