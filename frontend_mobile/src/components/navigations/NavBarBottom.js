import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MainPage from "../page/MainPage";
import CameraReceipt from "../page/CameraReceipt";
import SearchPage from "../page/SearchPage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#F4F4F4",
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          unmountOnBlur: true, //새로고침 역할 다른 페이지 이동했다가 오면 새로고침 역할 (꿀팁 랜덤 확인을 위해)
          headerShown: false,
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5, left: 5 }}>
              <Ionicons name="fast-food-outline" size={25} style={{ color: "#000000" }} />
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold" }}>메인</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraReceipt}
        options={{
          unmountOnBlur: true, //새로고침 역할 다른 페이지 이동했다가 오면 새로고침 역할 그래서 카메라 뒤로갔다와도 잘 작동함
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center", top: -25 }}>
              <Image
                source={require("../../../static/LogoButton.png")}
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5, right: 5 }}>
              <Ionicons name="search" size={25} style={{ color: "#000000" }} />
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold" }}>검색</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
