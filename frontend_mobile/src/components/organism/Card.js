import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageContainer from "../atom/ImageContainer";
import ExplainIcon from '../atom/ExplainIcon'

/*
name: 음식 이름
thumbnail: 음식 사진 url
difficulty: 어려운 정도
amount: 음식 양
time: 조리 시간
*/

export default function Card({ name, thumbnail, difficulty, amount, time }) {

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <View style={styles.cardContent}>
        <ImageContainer purpose="card" url={thumbnail} />
        <View style={styles.icons}>
          <ExplainIcon type="difficulty" degree={difficulty} purpose="card" />
          <ExplainIcon type="amount" iconText={amount} purpose="card" />
          <ExplainIcon type="time" iconText={time} purpose="card" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 230,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 4,
    shadowColor: 'black',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icons: {
    justifyContent: 'space-between',
  },
})