import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../atom/Button";
import DottedLine from "../atom/DottedLine";
import { EvilIcons } from "@expo/vector-icons";

export default function Receipt() {
  return (
    <View style={styles.receipt}>
      <Text style={styles.receiptName}>재료확인</Text>
      <DottedLine />
      <View style={styles.receiptBox}>
        <Text style={styles.receiptBoxName}>재료명</Text>
        <Text style={styles.receiptBoxNameDelete}>삭제</Text>
      </View>
      <DottedLine />
      <View style={styles.receiptIngredient}>
        <Text style={styles.receiptBoxName}>대파</Text>
        <EvilIcons name="trash" size={33} color="black" />
      </View>

      <DottedLine />
      <View style={styles.receiptTotal}>
        <Text style={styles.receiptTotalName}>Total: 4</Text>
        <Button size="small" color="BoldColor" variant="white">
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>재료 추가</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receipt: {
    width: 350,
    height: 480,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 4,
    shadowColor: "black",
    backgroundColor: "#FFE48E",
    padding: 5,
    marginBottom: 20,
  },
  receiptName: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
  },
  receiptBox: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: "center",
  },
  receiptBoxName: {
    fontSize: 18,
    flex: 1,
    justifyContent: "space-between",
  },
  receiptBoxNameDelete: {
    fontSize: 18,
  },
  receiptIngredient: {
    flex: 10,
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
  },
  receiptTotal: {
    flex: 2,
    flexDirection: "row",
    paddingRight: 5,
    paddingLeft: 15,
    alignItems: "center",
  },
  receiptTotalName: {
    fontSize: 18,
    flex: 1,
  },
});
