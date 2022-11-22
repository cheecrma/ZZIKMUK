import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/components/navigations/AboutNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tabs />
    </NavigationContainer>
  );
}
