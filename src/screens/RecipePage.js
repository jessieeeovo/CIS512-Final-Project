import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import recipeData from "../../assets/butter_chicken_recipe.json";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VoiceTest from "./VoiceTest";

import {
  useFonts,
  KaiseiDecol_400Regular,
  KaiseiDecol_500Medium,
  KaiseiDecol_700Bold,
} from "@expo-google-fonts/kaisei-decol";
const windowHeight = Dimensions.get("window").height;
const stepHeight = windowHeight / 8;

function RecipePage() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    KaiseiDecol_400Regular,
    KaiseiDecol_500Medium,
    KaiseiDecol_700Bold,
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef(null);
  const scrollRef = useRef(null);
  const { steps } = recipeData;
  const goBack = () => {
    navigation.navigate("HomePage");
  };

  useEffect(() => {
    const initialScrollOffset = stepHeight / 2 - windowHeight / 2;
    scrollRef.current?.scrollTo({ y: initialScrollOffset, animated: false });
  }, []);

  useEffect(() => {
    if (timerRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerRunning, timer]);

  useEffect(() => {
    if (currentStepIndex === 8) {
      setTimer(120);
    } else {
      setTimer(0);
      setTimerRunning(false);
    }
  }, [currentStepIndex]);

  const onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const viewportCenter = offsetY + windowHeight / 2;

    const currentStep = Math.floor(
      (viewportCenter - (windowHeight / 2 - stepHeight / 2)) / stepHeight
    );

    setCurrentStepIndex(currentStep);
  };

  const onNext = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const onBack = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const startTimer = () => {
    setTimerRunning((running) => !running);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.pageContainer}>
      <VoiceTest onNext={onNext} onBack={onBack}></VoiceTest>

      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.stepsContainer}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToInterval={stepHeight}
        snapToAlignment={"start"}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: windowHeight / 2 - stepHeight / 2,
          paddingLeft: 0,
        }}
      >
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text
              style={[
                styles.stepText,
                currentStepIndex === index ? styles.highlightedStep : {},
              ]}
            >
              {index + 1}. {step.instructions}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        {steps[currentStepIndex] &&
          steps[currentStepIndex].ingredients.map(
            (ingredient, ingredientIndex) => (
              <Text key={ingredientIndex} style={styles.ingredientText}>
                {"\u2022"} {ingredient}
              </Text>
            )
          )}
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime()}</Text>
        <TouchableOpacity
          onPress={() => (timerRunning ? startTimer(0) : startTimer(120))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {timerRunning ? "Stop Timer" : "Start Timer"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFCF2",
  },
  stepsContainer: {
    flex: 0.7,
    paddingLeft: 60,
    backgroundColor: "#FFFCF2",
    paddingTop: 100,
    paddingRight: 40,
  },
  pageContainer: {
    flex: 1,
    flexDirection: "row",
  },
  stepContainer: {
    minHeight: stepHeight,
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  stepText: {
    fontSize: 24,
    color: "#B99470",
    fontFamily: "KaiseiDecol_400Regular",
  },
  highlightedStep: {
    color: "#604933",
    fontWeight: "bold",
  },
  ingredientsContainer: {
    flex: 0.3,
    padding: 10,
    backgroundColor: "#A9B388",
    paddingTop: 50,
    paddingLeft: 20,
  },
  ingredientsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#604933",
    fontFamily: "KaiseiDecol_500Medium",
  },
  ingredientText: {
    fontSize: 24,
    marginTop: 5,
    color: "#604933",
    fontFamily: "KaiseiDecol_400Regular",
  },
  timerContainer: {
    position: "absolute",

    bottom: 20,
    backgroundColor: "#5f6f52",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    right: 35,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "600",
    color: "#FFFCF2",
    marginBottom: 10,
    fontFamily: "KaiseiDecol_400Regular",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFCF2",
    fontWeight: "600",
    fontFamily: "KaiseiDecol_400Regular",
  },
  button: {
    backgroundColor: "#A9B388",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    fontFamily: "KaiseiDecol_400Regular",
    alignSelf: "center",
  },

  backButtonWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 20,
    left: 10,
    backgroundColor: "#A9B388",
    width: 100,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#FFFCF2",
    marginLeft: 0,
    fontFamily: "KaiseiDecol_400Regular",
    fontSize: 20,
  },
});

export default RecipePage;
