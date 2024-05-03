import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import Voice from "@react-native-voice/voice";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class VoiceTest extends Component {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
    this.setState({
      started: "√",
    });
  };

  onSpeechRecognized = (e) => {
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√",
    });
  };

  onSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√",
    });
  };

  onSpeechError = (e) => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
    if (e.value[0].toLowerCase().includes("next")) {
      console.log("NEXT!");
      this.props["onNext"]();
      this._destroyRecognizer();
      setTimeout(this._startRecognizing, 3000);
    }
    if (e.value[0].toLowerCase().includes("go back")) {
      console.log("GO BACK!");
      this.props["onBack"]();
      this._destroyRecognizer();
      setTimeout(this._startRecognizing, 3000);
    }
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      //   <Text style={styles.instructions}>
      //     Press the button and start speaking.
      //   </Text>
      //   <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
      //   <Text
      //     style={styles.stat}
      //   >{`Recognized: ${this.state.recognized}`}</Text>
      //   <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
      //   <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
      //   <Text style={styles.stat}>Results</Text>
      //   {this.state.results.map((result, index) => {
      //     return (
      //       <Text key={`result-${index}`} style={styles.stat}>
      //         {result}
      //       </Text>
      //     )
      //   })}
      //   <Text style={styles.stat}>Partial Results</Text>
      //   {this.state.partialResults.map((result, index) => {
      //     return (
      //       <Text key={`partial-result-${index}`} style={styles.stat}>
      //         {result}
      //       </Text>
      //     )
      //   })}
      //   <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
      <TouchableHighlight onPress={this._startRecognizing} style={styles.button}>
        <FontAwesome
          name="volume-up"
          size={25}
          color={"#FFFCF2"}
          style={styles.searchIcon}
        />
      </TouchableHighlight>
      //   <TouchableHighlight onPress={this._stopRecognizing}>
      //     <Text style={styles.action}>Stop Recognizing</Text>
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={this._cancelRecognizing}>
      //     <Text style={styles.action}>Cancel</Text>
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={this._destroyRecognizer}>
      //     <Text style={styles.action}>Destroy</Text>
      //   </TouchableHighlight>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9B388",
    borderRadius: 30,
    width: 40,
    height: 40,
  },
});

export default VoiceTest;
