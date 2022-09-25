import React from "react";
import Input from "../atom/input";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SearchPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableWithoutFeedback>
        <View style={{ width: 300, backgroundColor: "white", borderRadius: 5 }}>
          <Input />
        </View>
        <TouchableWithoutFeedback>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
