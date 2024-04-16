import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Stack } from "react-native";
import HomePage from "./src/screens/HomePage.js";
import RecipePage from "./src/screens/RecipePage.js";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: { backgroundColor: "#FFFCF2" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="RecipePage" component={RecipePage} />
      </Stack.Navigator>
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
