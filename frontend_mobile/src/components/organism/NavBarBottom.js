import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainPage from "../page/MainPage";
import RecipePage from "../page/RecipePage";
import SettingPage from "../page/SettingPage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainPage}
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
