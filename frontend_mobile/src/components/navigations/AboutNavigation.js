import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReceiptPage from "../page/ReceiptPage";
import NavBarBottom from "../navigations/NavBarBottom";
import RecipePage from "../page/RecipePage";
import RecipeStepPage from "../page/RecipeStepPage";
import CompletePage from "../page/CompletePage";
import RecipeRecommendPage from "../page/RecipeRecommendPage";

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
      <Stack.Screen
        name="Recipe"
        component={RecipePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecipeStep"
        component={RecipeStepPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Complete"
        component={CompletePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Recommend"
        component={RecipeRecommendPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
