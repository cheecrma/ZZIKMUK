import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function textTest() {
  return (
    <View style={styles.container}>
      <Text>ZZIK MUK</Text>
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
});
