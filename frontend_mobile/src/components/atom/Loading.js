import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> 레시피 검색 중... </Text>
      <Image source={require("../../../static/test1.gif")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
});
