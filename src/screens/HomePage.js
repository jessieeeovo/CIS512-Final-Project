import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

const HomePage = () => {
  const handleConvertPress = () => {
    // Handle the convert press event here
  };

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
        <Button title="Convert" onPress={handleConvertPress} />
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
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
    height: 200, // Set image height
  },
  recipeTitle: {
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  time: {
    padding: 10,
    color: "#666",
  },
});
