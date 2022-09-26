import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchPage from "../page/ReceiptPage";
import CameraReceipt from "../page/CameraReceipt";

const ChatStack = createStackNavigator();

export default function SettingPage() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Hello"
        component={SearchPage}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name="ChatRoom"
        component={CameraReceipt}
        options={{
          headerShown: false,
        }}
      />
    </ChatStack.Navigator>
  );
}
