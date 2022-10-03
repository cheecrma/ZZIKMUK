import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import RecipePagination from "../organism/RecipePagination";
import Button from "../atom/Button";
import TopNav from "../organism/TopNav";
import * as Speech from "expo-speech";
import { fetchRecipeStep } from "../../apis/recipes";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { EncodingType } from "expo-file-system";
import axios from "axios";

export default function RecipeStepPage({ route, navigation }) {
  const [stepInfo, setStepInfo] = useState([]);
  const [isPlayed, setIsPlayed] = useState(false);
  const [recording, setRecording] = useState();

  function requestRecipeStepSuccess(res) {
    console.log(res.data);
    setStepInfo(res.data);
  }

  function requestRecipeStepFail(err) {
    console.log(err);
    setStepInfo([]);
  }

  useEffect(() => {
    fetchRecipeStep(route.params.id, route.params.step, requestRecipeStepSuccess, requestRecipeStepFail);
  }, []);

  function changeStep(newStep) {
    if (recording) {
      setRecording(undefined);
      recording.stopAndUnloadAsync();
    }
    navigation.push("RecipeStep", { id: route.params.id, step: newStep });
  }

  function finish() {
    navigation.push("Complete", { id: stepInfo[0], totalSteps: stepInfo[5] });
  }

  // expo tts
  function playPauseToggle() {
    setIsPlayed(!isPlayed);
    if (!isPlayed) {
      const thingToSay = stepInfo[4].replace(" ", "").length > 7 ? stepInfo[4] : stepInfo[4] + " ".repeat(14);
      Speech.speak(thingToSay);
      setTimeout(() => {
        setIsPlayed(false);
      }, (stepInfo[4].replace(" ", "").length / 5.7) * 1000);
    } else {
      Speech.stop();
    }
  }

  // 음성 녹음 시작
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      console.log("Recording started");

      await wait(4000);

      // 음성녹음 정지
      console.log("Stopping recording..");
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      let file = "";
      await FileSystem.readAsStringAsync(uri, { encoding: EncodingType.Base64 }).then(content => {
        file = content;
      });
      let rlt = "";
      await axios
        .post(`https://j7a102.p.ssafy.io/api/languages/stt/`, {
          base_64: file,
        })
        .then(res => {
          rlt = res.data.status_code;

          if (route.params.step < stepInfo[5] && rlt == 3) {
            navigation.push("RecipeStep", { id: route.params.id, step: route.params.step + 1 });
          } else if (route.params.step > 1 && rlt == 1) {
            navigation.push("RecipeStep", { id: route.params.id, step: route.params.step - 1 });
          } else if (rlt == 2) {
            playPauseToggle();
          } else {
            console.log(rlt);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  return (
    <View style={styles.container}>
      <TopNav title={stepInfo[1]} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: stepInfo[3] }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepText}>{stepInfo[4]}</Text>
        </View>
        <View style={styles.soundBtnContainer}>
          <TouchableWithoutFeedback onPress={playPauseToggle}>
            <View style={styles.soundBtn}>
              {isPlayed ? (
                <Entypo name="controller-stop" size={24} color="white" />
              ) : (
                <AntDesign name="caretright" size={20} color="white" />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={recording ? null : startRecording}>
            <View style={styles.soundBtn}>
              <FontAwesome name="microphone" size={20} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.explain}>
          <Text>마이크 버튼을 누르고 말해보세요</Text>
          <Text>다음으로 넘겨줘, 이전으로 이동해줘, 다시 읽어줘</Text>
        </View>
        <RecipePagination totalSteps={stepInfo[5]} checkedIndex={route.params.step} check={changeStep} />
        <View style={styles.stepBtn}>
          {stepInfo[2] > 1 ? (
            <Button variant="white" color="black" size="small" onPress={() => changeStep(stepInfo[2] - 1)}>
              <Text style={styles.btnText}>이전 단계</Text>
            </Button>
          ) : null}
          {stepInfo[2] === stepInfo[5] ? (
            <Button variant="MainColor" color="white" size="small" onPress={() => finish()}>
              <Text style={styles.btnText}>요리 끝</Text>
            </Button>
          ) : (
            <Button variant="MainColor" color="white" size="small" onPress={() => changeStep(stepInfo[2] + 1)}>
              <Text style={styles.btnText}>다음 단계</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 24,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  step: {
    backgroundColor: "white",
    width: "90%",
    height: 160,
    borderRadius: 15,
    justifyContent: "center",
    padding: 5,
  },
  stepText: {
    fontSize: 20,
  },
  soundBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  soundBtn: {
    backgroundColor: "#FF8B34",
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  explain: {
    backgroundColor: "#FFE48E",
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  stepBtn: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    width: 300,
    height: 160,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
    shadowColor: "black",
  },
  image: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
  },
});
