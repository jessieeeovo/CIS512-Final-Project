import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  useFonts,
  KaiseiDecol_400Regular,
  KaiseiDecol_500Medium,
  KaiseiDecol_700Bold,
} from "@expo-google-fonts/kaisei-decol";
import { setCustomText } from "react-native-global-props";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomePage({ navigation }) {
    let [fontsLoaded] = useFonts({
    KaiseiDecol_400Regular,
    KaiseiDecol_500Medium,
    KaiseiDecol_700Bold,
  });
  setCustomText(customTextProps);
  const handleConvertPress = () => {
    navigation.navigate('RecipePage');
  };
  if (!fontsLoaded) {
    return;
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>InstructaChef</Text>
        </View>
        <View style={styles.convertSection}>
          <TextInput
            style={styles.input}
            placeholder="https://never-gonna-give-up-video"
            // You'll want to update this state with the actual value
          />
          <TouchableHighlight onPress={handleConvertPress}>
            <Text style={{fontFamily: "KaiseiDecol_400Regular"}}>Convert</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.recentRecipes}>
          <View style={styles.recipeCard}>
            <Image
              style={styles.image}
              source={require("./../../assets/pasta.png")}
            />
            <Text style={styles.recipeTitle}>GIGI HADID'S FAMOUS Pasta</Text>
            <Text style={styles.time}>25min</Text>
          </View>
          <View style={styles.recipeCard}>
            <Image
              style={styles.image}
              source={require("./../../assets/burger.png")}
            />
            <Text style={styles.recipeTitle}>Classic Cheese Burger</Text>
            <Text style={styles.time}>30min</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};
export default HomePage;

const customTextProps = {
  style: {
    fontFamily: "KaiseiDecol_400Regular",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "KaiseiDecol_700Bold",
    fontSize: 80,
  },
  convertSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  recentRecipes: {
    fontFamily: "KaiseiDecol_400Regular",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeCard: {
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  recipeTitle: {
    fontFamily: "KaiseiDecol_400Regular",
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  time: {
    fontFamily: "KaiseiDecol_400Regular",
    padding: 10,
    color: "#666",
  },
});
