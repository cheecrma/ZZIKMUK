import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ReceiptCheck from "../organism/ReceiptCheck";
import Button from "../atom/Button";

export default function ReceiptPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>
          📷 영수증 <Text style={{ color: "#FF8B34" }}>인식</Text> 📷
        </Text>
        <View></View>
      </View>
      <View style={styles.receipt}>
        <ReceiptCheck />
        <Text>원하는 재료를 추가해서 다양한 레시피를 제공 받아 보세요.</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button color="white" variant="BoldColor" size="large">
          추천 레시피 확인하러 가기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  receipt: {
    alignItems: "center",
    flex: 6,
  },
});
