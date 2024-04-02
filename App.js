import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/screens/HomePage.js';
import './index.css'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomePage></HomePage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
