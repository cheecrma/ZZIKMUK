import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TextTest from "./src/components/atom/textTest";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/components/organism/NavBarBottom";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tabs />
    </NavigationContainer>
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
