import React from "react";
import { StyleSheet, View } from "react-native";
import ReceiptCheck from "../organism/ReceiptCheck";
import TopNav from "../organism/TopNav";

export default function ReceiptPage({ navigation, route }) {
  return (
    <View style={styles.container}>
      <TopNav title={"π· μμμ¦ μΈμ π·"} />
      <View style={styles.receipt}>
        <ReceiptCheck receipt={route.params.receipt} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9f9",
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
    flex: 10,
  },
});
