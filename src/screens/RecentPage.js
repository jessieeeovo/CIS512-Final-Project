import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CheeseBurgerRecipe = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("HomePage");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image
        source={require("./../../assets/pasta.png")}
        style={styles.image}
      />
      <Text style={styles.title}>GIGI HADID'S FAMOUS Pasta</Text>
      <Text style={styles.header}>Ingredients:</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={styles.ingredients}>
          • Penne Pasta{"\n"}• Tomato Paste{"\n"}• Heavy Cream{"\n"}• Garlic{"\n"}•
          Onion{"\n"}• Olive Oil{"\n"}• Red Pepper Flakes
        </Text>
        <View>
          <View style={styles.timerContainer}>
            <FontAwesome
              name="clock-o"
              size={50}
              color={"#5F6F52"}
              style={styles.timerIcon}
            />
            <Text style={styles.timerText}>30 min</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => alert("Start Cooking!")}
          >
            <Text style={styles.buttonText}>Start Cooking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF2",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  title: {
    fontFamily: "KaiseiDecol_700Bold",
    color: "#604933",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  header: {
    fontFamily: "KaiseiDecol_700Bold",
    color: "#604933",
    fontSize: 30,
    marginTop: 20,
    marginLeft: 150,
  },
  ingredients: {
    fontFamily: "KaiseiDecol_700Bold",
    color: "#B99470",
    fontSize: 24,
    marginVertical: 10,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  backButton: {
    position: "absolute",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9B388",
    borderRadius: 30,
    width: 100,
    height: 40,
    top: 40,
    left: 30,
    zIndex: 1,
  },
  backButtonText: {
    color: "#FFFCF2",
    marginLeft: 0,
    fontFamily: "KaiseiDecol_500Medium",
    fontSize: 20,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timerIcon: {
    color: "#5F6F52",
    marginLeft: 40,
  },
  timerText: {
    fontSize: 24,
    color: "#5F6F52",
    marginLeft: 10,
    fontFamily: "KaiseiDecol_500Medium",
  },
  button: {
    backgroundColor: "#A9B388",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFCF2",
    fontFamily: "KaiseiDecol_500Medium",
  },
});

export default CheeseBurgerRecipe;
