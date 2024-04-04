import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import recipeData from '../../assets/butter_chicken_recipe.json';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';



import {
  useFonts,
  KaiseiDecol_400Regular,
  KaiseiDecol_500Medium,
  KaiseiDecol_700Bold,
} from "@expo-google-fonts/kaisei-decol";
const windowHeight = Dimensions.get('window').height;
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
    // Make sure you have navigation passed in as a prop if you are using React Navigation
    navigation.navigate('HomePage');
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

  const onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const viewportCenter = offsetY + windowHeight / 2;
  
    // Calculate the index of the step that should be highlighted based on the scroll position.
    const currentStep = Math.floor((viewportCenter - (windowHeight / 2 - stepHeight / 2)) / stepHeight);
    
    setCurrentStepIndex(currentStep);
  };
  
  
  

  const startTimer = () => {
    setTimerRunning(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.pageContainer}>
     
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
        snapToAlignment={'start'}
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
              currentStepIndex === index ? styles.highlightedStep : {}
            ]}
          >
            {index + 1}. {step.instructions}
          </Text>
        </View>
        
        ))}
      </ScrollView>
      <View style={styles.ingredientsContainer}>
  <Text style={styles.ingredientsTitle}>Ingredients</Text>
  {steps[currentStepIndex] && steps[currentStepIndex].ingredients.map((ingredient, ingredientIndex) => (
    <Text key={ingredientIndex} style={styles.ingredientText}>
      {"\u2022"} {ingredient}
    </Text>
  ))}
</View>

      {timerRunning && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime()}</Text>
          <TouchableOpacity onPress={startTimer} style={styles.button}>
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50, // adjust as needed
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFCF2', // match your page background
  },
  stepsContainer: {
    flex: 0.7,
    paddingLeft: 60,
    backgroundColor: '#FFFCF2',
    paddingTop: 100, 
    paddingRight: 40,
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  stepContainer: {
    minHeight: stepHeight,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  stepText: {
    fontSize: 24,
    color: '#B99470',
    fontFamily: "KaiseiDecol_400Regular",
  },
  highlightedStep: {
    color: '#604933', 
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    flex: 0.3,
    padding: 10,
    backgroundColor: '#A9B388',
    paddingTop: 50, 
    paddingLeft: 20,
  },
  ingredientsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#604933',
    fontFamily: "KaiseiDecol_500Medium",
  },
  ingredientText: {
    fontSize: 24,
    marginTop: 5,
    color: '#604933',
    fontFamily: "KaiseiDecol_400Regular",
  },
  timerContainer: {
    position: 'absolute',
    bottom: 20,
    left: '35%',
    right: '35%',
    backgroundColor: '#5f6f52',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 10,
    backgroundColor: '#A9B388', 
    width: 100, // Adjust the width as necessary
    height: 40, // Adjust the height as necessary
    borderRadius: 30, // This will ensure the view is elliptical
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFCF2', 
    marginLeft: 0, 
    fontFamily: "KaiseiDecol_400Regular",
    fontSize: 20,
  },
  
});

export default RecipePage;
