import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import recipeData from "../../assets/recipe.json";
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
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);
  const scrollRef = useRef(null);
  const { steps } = recipeData;
  const goBack = () => {
    navigation.navigate("HomePage");
  };

  const allIngredients = new Set(
    recipeData.steps.flatMap((step) => step.ingredients)
  );
  const allIngredientsArray = Array.from(allIngredients);
  const isIngredientInCurrentStep = (ingredient) => {
    return recipeData.steps[currentStepIndex]?.ingredients.includes(ingredient);
  };

  // useEffect(() => {
  //   const initialScrollOffset = stepHeight / 2 - windowHeight / 2;
  //   scrollRef.current?.scrollTo({ y: initialScrollOffset, animated: false });
  // }, []);

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
    const regex = /(\d+)\s*minutes/;
    const match = steps[currentStepIndex].instructions.match(regex);
    if (match && match[1]) {
      setTimer(parseInt(match[1], 10) * 60);
      setCurrentTime(parseInt(match[1], 10) * 60);
    } else {
      setTimer(0);
      setTimerRunning(false);
      setCurrentTime(0);
    }
  }, [currentStepIndex]);

  const onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const viewportCenter = offsetY + windowHeight / 2;

    const currentStep = Math.min(
      steps.length - 1,
      Math.max(
        0,
        Math.floor(
          (viewportCenter - (windowHeight / 2 - stepHeight / 2)) / stepHeight
        )
      )
    );
    setCurrentStepIndex(currentStep);
  };

  const onNext = () => {
    const i = Math.min(steps.length - 1, Math.max(0, currentStepIndex + 1));
    setCurrentStepIndex(i);
  };

  const onBack = () => {
    const i = Math.min(steps.length - 1, Math.max(0, currentStepIndex - 1));
    setCurrentStepIndex(i);
  };

  const startTimer = () => {
    setTimerRunning((running) => !running);
  };

  const resetTimer = () => {
    setTimer(currentTime);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <VoiceTest onNext={onNext} onBack={onBack}></VoiceTest>
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
        contentContainerStyle={{ paddingBottom: 600 }}
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

      <View style={styles.timerBackgrounContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <ScrollView
          style={styles.ingredientsContainer}
          contentContainerStyle={{ paddingBottom: 180 }}
        >
          {allIngredientsArray
            .sort((a, b) => {
              // Move ingredients in current step to the top
              const isInCurrentStepA = isIngredientInCurrentStep(a) ? -1 : 1;
              const isInCurrentStepB = isIngredientInCurrentStep(b) ? -1 : 1;
              return isInCurrentStepA - isInCurrentStepB;
            })
            .map((ingredient, index) => (
              <Text
                key={index}
                style={[
                  styles.ingredientText,
                  isIngredientInCurrentStep(ingredient) &&
                    styles.highlightedIngredient,
                ]}
              >
                {"\u2022 "}
                {truncateText(ingredient, 20)}
              </Text>
            ))}
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime()}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={resetTimer} style={styles.button}>
                <Text style={styles.buttonText}>Reset Timer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={startTimer} style={styles.button}>
                <Text style={styles.buttonText}>
                  {timerRunning ? "Stop Timer" : "Start Timer"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    width: "63%",
    paddingLeft: 40,
    backgroundColor: "#FFFCF2",
    paddingTop: 0,
    marginTop: 100,
    paddingRight: 20,
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
    fontFamily: "KaiseiDecol_500Medium",
  },
  highlightedStep: {
    color: "#604933",
    fontWeight: "bold",
  },
  ingredientsContainer: {
    width: "100%",
    backgroundColor: "#A9B388",
    marginBottom: 230,
  },
  belowingredientsContainer: {
    width: "37%",
    backgroundColor: "#A9B388",
    marginTop: 600,
  },
  ingredientsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#604933",
    fontFamily: "KaiseiDecol_700Bold",
  },
  ingredientText: {
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    color: "#604933",
    fontFamily: "KaiseiDecol_500Medium",
  },
  timerBackgrounContainer: {
    width: "37%",
    backgroundColor: "#A9B388",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
  },
  timerContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#5f6f52",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 60,
    fontWeight: "600",
    color: "#FFFCF2",
    marginBottom: 10,
    fontFamily: "KaiseiDecol_500Medium",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFCF2",
    fontWeight: "600",
    fontFamily: "KaiseiDecol_500Medium",
  },
  button: {
    backgroundColor: "#A9B388",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    fontFamily: "KaiseiDecol_500Medium",
    alignSelf: "center",
  },

  backButtonWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    left: 30,
    width: 150,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9B388",
    borderRadius: 30,
    width: 100,
    height: 40,
  },
  backButtonText: {
    color: "#FFFCF2",
    marginLeft: 0,
    fontFamily: "KaiseiDecol_500Medium",
    fontSize: 20,
  },
  highlightedIngredient: {
    color: "#FFFCF2",
    fontWeight: "bold",
  },
  topCorner: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RecipePage;
