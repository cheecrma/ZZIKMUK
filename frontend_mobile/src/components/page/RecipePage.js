import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RecipePage() {
  return (
    <View style={styles.container}>
      <Text>RecipePage</Text>
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
