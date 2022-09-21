import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function organism() {
  return (
    <View style={styles.container}>
      <Text>organism</Text>
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
