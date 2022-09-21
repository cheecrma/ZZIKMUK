import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import MainPage from "../page/MainPage";
import RecipePage from "../page/RecipePage";
import SettingPage from "../page/SettingPage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{ headerShown: false, tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
            source={require('../../../static/LogoButton.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25, tintColor: focused ? '#e32f45' : '#748c94',
            }}
            />
            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              Home
            </Text>
          </View>
        ) }}
      />
      <Tab.Screen
        name="Recipe"
        options={{ headerShown: false }}
        component={RecipePage}
      />
      <Tab.Screen
        name="Setting"
        options={{ headerShown: false }}
        component={SettingPage}
      />
    </Tab.Navigator>
  );
}
