import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import recipeData from "../../assets/butter_chicken_recipe.json";

function RecipePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef();
  const scrollRef = useRef();

  // Destructuring the recipe object from the JSON data
  const { name, steps } = recipeData;

  useEffect(() => {
    if (timerRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerRunning]);

  useEffect(() => {
    if (timer === 0 && timerRunning) {
      clearInterval(intervalRef.current);
      setTimerRunning(false);
    }
  }, [timer]);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const stepHeight = 100; // Adjust this based on your step component's height
    const currentStep = Math.floor(scrollPosition / stepHeight);
    setCurrentStepIndex(currentStep);

    // Set the timer to 2 minutes when the user reaches step 9 (index 8 in the array)
    if (currentStep === 8) {
      setTimer(2 * 60); // 2 minutes
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.recipeTitle}>{name}</Text>
      <ScrollView
        style={styles.scrollContainer}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text
              style={[
                styles.stepText,
                currentStepIndex === index && styles.highlightedStep,
              ]}
            >
              {step.instructions}
            </Text>
            {currentStepIndex === index && step.ingredients.length > 0 && (
              <View style={styles.ingredientsContainer}>
                {step.ingredients.map((ingredient, ingredientIndex) => (
                  <Text key={ingredientIndex} style={styles.ingredientText}>
                    {ingredient}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {currentStepIndex === 8 && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime()}</Text>
          <TouchableOpacity
            onPress={startTimer}
            style={styles.button}
            disabled={timerRunning || timer === 0}
          >
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stepText: {
    fontSize: 16,
    // Add your styles for step text
  },
  highlightedStep: {
    color: "#604933",
  },
  ingredientsContainer: {
    marginTop: 10,
    color: "#A9B388",
  },
  ingredientText: {
    fontSize: 16,
    color: "#604933",
  },
  timerContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#5f6f52",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#A9B388",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFCF2",
    fontWeight: "bold",
  },
});

export default RecipePage;
