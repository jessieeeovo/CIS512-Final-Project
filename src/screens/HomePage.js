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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function HomePage({ navigation }) {
  let [fontsLoaded] = useFonts({
    KaiseiDecol_400Regular,
    KaiseiDecol_500Medium,
    KaiseiDecol_700Bold,
  });
  setCustomText(customTextProps);
  const handleConvertPress = () => {
    navigation.navigate("RecipePage");
  };
  if (!fontsLoaded) {
    return;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>InstructaChef</Text>
        </View>
        <View style={styles.inputSection}>
          <FontAwesome
            name="search"
            size={30}
            color={"#5F6F52"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"https://never-gonna-give-up-video"}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableHighlight
            style={styles.convertSection}
            onPress={handleConvertPress}
            underlayColor="#DDDDDD"
          >
            <Text style={styles.convertText}>Convert</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.recentText}>Recent</Text>
        <View style={styles.recentRecipes}>
          <View style={styles.recipeCard}>
            <Image
              style={styles.image}
              source={require("./../../assets/pasta.png")}
            />
            <Text style={styles.recipeTitle}>
              GIGI HADID'S FAMOUS Pasta {"                          "}
              <FontAwesome name="clock-o" size={20} /> 20min
            </Text>
          </View>
          <View style={styles.recipeCard}>
            <Image
              style={styles.image}
              source={require("./../../assets/burger.png")}
            />
            <Text style={styles.recipeTitle}>
              Classic Cheese Burger {"                                        "}
              <FontAwesome name="clock-o" size={20} /> 30min
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
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
  },
  header: {
    marginTop: 80,
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "KaiseiDecol_700Bold",
    color: "#604933",
    fontSize: 80,
  },
  convertSection: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#A9B388",
    width: "20%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 10,
  },
  convertText: {
    fontFamily: "KaiseiDecol_700Bold",
    fontSize: 32,
    margin: 5,
    paddingHorizontal: 30,
    color: "#5F6F52",
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center",
    borderColor: "#A9B388",
    borderWidth: 2,
    paddingVertical: 5,
    marginHorizontal: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: "90%",
    marginBottom: 10,
    fontSize: 30,
    fontFamily: "KaiseiDecol_400Regular",
  },
  recentRecipes: {
    fontFamily: "KaiseiDecol_700Bold",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  recipeCard: {
    width: "48%",
    elevation: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
  },
  recipeTitle: {
    fontFamily: "KaiseiDecol_700Bold",
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 20,
    padding: 10,
    backgroundColor: "#B99470",
  },
  recentText: {
    paddingHorizontal: "1.5%",
    fontFamily: "KaiseiDecol_700Bold",
    fontSize: 30,
    color: "#604933",
    marginVertical: 10,
  },
  searchIcon: {
    paddingLeft: 20,
  },
});
