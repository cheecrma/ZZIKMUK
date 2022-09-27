import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ReceiptPage from "../page/ReceiptPage";
import NavBarBottom from "../navigations/NavBarBottom";

const Stack = createStackNavigator();

export default function Search() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nav"
        component={NavBarBottom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Receipt"
        component={ReceiptPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
