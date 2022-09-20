import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function App() {
  return (
    <TouchableOpacity onPress={() => alert("hello!")}>
      <Image
        style={styles.container}
        source={require("../../../static/LogoButton.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
  },
});
